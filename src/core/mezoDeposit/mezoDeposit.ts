import {
    createPublicClient,
    createWalletClient,
    encodeFunctionData,
    formatUnits,
    http,
    parseUnits,
    PrivateKeyAccount,
} from 'viem';
import { getMessage, getValueFromPercent } from '../../data/utils/utils';
import * as console from 'node:console';
import { getAccountStatus, getAddress, getNonce, registerUser, session } from './mezoDepositRequester';
import { printError, printInfo, printSuccess } from '../../data/logger/logPrinter';
import { Config, DefiLamaSwapConfig, MezoConfig } from '../../config';
import { delay } from '../../data/helpers/delayer';
import { erc20ABI } from '../../abis/erc20';
import { usdtContractAddress } from '../defiLama/defiLamaData';
import { mezoContractAddress, mezoModuleName } from './mezoDepositData';
import { mainnet } from 'viem/chains';
import { swapETHToUSDTV2 } from '../defiLama/defiLama';
import { mezoABI } from '../../abis/mezo';

export async function mezoDeposit(account: PrivateKeyAccount) {
    printInfo(`Выполняю модуль ${mezoModuleName}`);

    const nonce = await getNonce();

    const message = getMessage(account.address, nonce);

    const signature = await account.signMessage({
        message: message,
    });

    await session(message, signature, nonce);

    const isExists = await getAccountStatus(account.address, nonce);

    if (isExists == false) {
        const code = MezoConfig.refCodes[Math.floor(Math.random() * MezoConfig.refCodes.length)];
        printInfo(`Аккаунт не зарегистрирован, буду использовать код - ${code} `);

        await delay(MezoConfig.delayBeforeRegistration.minRange, MezoConfig.delayBeforeRegistration.maxRange, true);

        await registerUser(account.address, code, nonce);
    } else {
        printInfo(`Аккаунт зарегистрирован`);
    }

    await getAddress(nonce);

    return await makeTx(account);
}

async function makeTx(account: PrivateKeyAccount) {
    const lockPeriod = MezoConfig.depositPeriod[Math.floor(Math.random() * MezoConfig.depositPeriod.length)];

    const client = createPublicClient({
        chain: mainnet,
        transport: Config.ethereumRpc == null ? http() : http(Config.ethereumRpc),
    });

    const walletClient = createWalletClient({
        chain: mainnet,
        transport: Config.ethereumRpc == null ? http() : http(Config.ethereumRpc),
    });

    let usdtBalance = await client.readContract({
        address: usdtContractAddress,
        abi: erc20ABI,
        functionName: 'balanceOf',
        args: [account.address],
    });

    let value = usdtBalance;

    if (usdtBalance < parseUnits(DefiLamaSwapConfig.minUsdtSwapAmount.toString(), 6)) {
        printInfo(
            `Текущий баланс USDT в Ethereum Chain равен ${formatUnits(usdtBalance, 6)}, что больше чем необходимое число в конфиге ${DefiLamaSwapConfig.minUsdtSwapAmount} (DefiLamaSwapConfig.minUsdtSwapAmount), буду выполнять покупку на DefiLama`,
        );
        const result = await swapETHToUSDTV2(account);
        if (result == true) {
            await delay(DefiLamaSwapConfig.delayAfterSwap.minRange, DefiLamaSwapConfig.delayAfterSwap.maxRange, true);
        } else {
            printInfo(`Не удалось произвести свап`);
            return false;
        }
    }

    usdtBalance = await client.readContract({
        address: usdtContractAddress,
        abi: erc20ABI,
        functionName: 'balanceOf',
        args: [account.address],
    });

    if (MezoConfig.isDepositAll) {
        printInfo(`Включен режим депозита всего имеющегося ${formatUnits(usdtBalance, 6)} USDT`);
    } else {
        value = await getValueFromPercent(
            MezoConfig.depositPercent.range,
            MezoConfig.depositPercent.fixed,
            'USDT',
            usdtBalance,
        );
    }

    await giveApprove(account, value);

    printInfo(`Буду депозитить на срок - ${lockPeriod}`);

    const depositEncoded = encodeFunctionData({
        abi: mezoABI,
        functionName: 'deposit',
        args: [usdtContractAddress, value, lockPeriod],
    });

    const preparedDeposit = await walletClient
        .prepareTransactionRequest({
            account,
            to: mezoContractAddress,
            data: depositEncoded,
        })
        .catch((e) => {
            printError(`Произошла ошибка во время выполнения модуля ${mezoModuleName} - ${e}`);
        });

    const signature = await walletClient.signTransaction(preparedDeposit!).catch((e) => {
        printError(`Произошла ошибка во время выполнения модуля ${mezoModuleName} - ${e}`);
        return undefined;
    });

    if (signature !== undefined) {
        const approveHash = await walletClient.sendRawTransaction({ serializedTransaction: signature }).catch((e) => {
            printError(`Произошла ошибка во время выполнения модуля ${mezoModuleName} - ${e}`);
            return false;
        });

        if (approveHash === false) {
            return false;
        }

        const url = `${mainnet.blockExplorers?.default.url + '/tx/' + approveHash}`;

        // @ts-ignore
        const transaction = await client
            .waitForTransactionReceipt({ retryCount: 3, hash: <`0x${string}`>approveHash })
            .then((result) => printSuccess(`Транзакция успешно отправлена. Хэш транзакции: ${url}\n`))
            .catch((e) => {
                printError(`Произошла ошибка во время выполнения модуля ${mezoModuleName} - ${e}`);
                return { request: undefined };
            });

        return true;
    }

    return false;
}

async function giveApprove(account: PrivateKeyAccount, value: bigint) {
    const client = createPublicClient({
        chain: mainnet,
        transport: Config.ethereumRpc == null ? http() : http(Config.ethereumRpc),
    });

    const walletClient = createWalletClient({
        chain: mainnet,
        transport: Config.ethereumRpc == null ? http() : http(Config.ethereumRpc),
    });

    const usdtBalance = await client.readContract({
        address: usdtContractAddress,
        abi: erc20ABI,
        functionName: 'balanceOf',
        args: [account.address],
    });

    const allowance = await client.readContract({
        address: usdtContractAddress,
        abi: erc20ABI,
        functionName: 'allowance',
        args: [account.address, mezoContractAddress],
    });

    if (allowance < BigInt(value!)) {
        printInfo(`Произвожу approve ${formatUnits(value!, 6)} USDT`);

        const approveEncoded = encodeFunctionData({
            abi: erc20ABI,
            functionName: 'approve',
            args: [mezoContractAddress, usdtBalance!],
        });

        const preparedApprove = await walletClient
            .prepareTransactionRequest({
                account,
                to: usdtContractAddress,
                data: approveEncoded,
            })
            .catch((e) => {
                printError(`Произошла ошибка во время выполнения approve USDT - ${e}`);
            });

        const signature = await walletClient.signTransaction(preparedApprove!).catch((e) => {
            printError(`Произошла ошибка во время выполнения approve USDT - ${e}`);
            return undefined;
        });

        if (signature !== undefined) {
            const approveHash = await walletClient
                .sendRawTransaction({ serializedTransaction: signature })
                .catch((e) => {
                    printError(`Произошла ошибка во время выполнения approve USDT - ${e}`);
                    return false;
                });

            if (approveHash === false) {
                return false;
            }

            const url = `${mainnet.blockExplorers?.default.url + '/tx/' + approveHash}`;

            printSuccess(`Транзакция успешно отправлена. Хэш транзакции: ${url}\n`);

            await delay(Config.delayBetweenModules.minRange, Config.delayBetweenModules.maxRange, true);
        }
    }
}
