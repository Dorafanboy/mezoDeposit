import { printError, printInfo, printSuccess } from '../../data/logger/logPrinter';
import {
    createPublicClient,
    createWalletClient,
    formatUnits,
    http,
    PrivateKeyAccount,
    PublicClient,
    SimulateContractReturnType,
    zeroAddress,
} from 'viem';
import { mainnet } from 'viem/chains';
import { Config, DefiLamaSwapConfig } from '../../config';
import {
    appData,
    cowContractAddress,
    cowSwapModuleName,
    cowSwapSlippage,
    defiLamaModuleName,
    eeContractAddress,
    excludedDEXS,
    inchSwapModuleName,
    minCowSwapValue,
    paraSwapModuleName,
    partner,
    usdtContractAddress,
    wETHContractAddress,
} from './defiLamaData';
import { getValue } from '../../data/utils/utils';
import { checkGwei } from '../../data/helpers/gweiChecker';
import { delay } from '../../data/helpers/delayer';
import {
    getCowSwapDstAmount,
    getInchSwapDstAmount,
    getParaSwapDataResult,
    getParaSwapDstAmount,
} from './defiLamaRequester';
import { ICowResponseData, IInchSwapDataResponse, IParaSwapResponseData } from '../../data/utils/interfaces';
import { cowSwapABI } from '../../abis/cowSwap';

export async function swapETHToUSDTV2(account: PrivateKeyAccount) {
    printInfo(`Выполняю модуль ${defiLamaModuleName}`);

    const client = createPublicClient({
        chain: mainnet,
        transport: Config.ethereumRpc == null ? http() : http(Config.ethereumRpc),
    });

    let currentTry: number = 0,
        value = BigInt(0);

    while (currentTry <= Config.retryCount) {
        if (currentTry == Config.retryCount) {
            printError(
                `Не нашел баланс для ${client}. Превышено количество попыток - [${currentTry}/${Config.retryCount}]\n`,
            );
            return false;
        }

        value = await getValue(
            client,
            account.address,
            DefiLamaSwapConfig.ethSwapAmount.range,
            DefiLamaSwapConfig.ethSwapAmount.fixed,
            true,
        );

        printInfo(`Пытаюсь произвести swap ${formatUnits(value, 18)} ETH`);

        currentTry++;

        if (value != null && value != BigInt(-1)) {
            currentTry = Config.retryCount + 1;
        } else {
            await delay(Config.delayBetweenAction.minRange, Config.delayBetweenAction.maxRange, false);
        }
    }

    await checkGwei();

    printInfo(`Буду производить swap ${formatUnits(value, 18)} ETH`);

    const paraSwapRequestData = {
        srcToken: eeContractAddress,
        destToken: usdtContractAddress.toLowerCase(),
        amount: value.toString(),
        srcDecimals: 18,
        destDecimals: 6,
        partner: partner,
        side: 'SELL',
        network: 1,
        excludeDEXS: excludedDEXS,
    };

    const paraSwapData = await getParaSwapDstAmount(paraSwapRequestData);
    const paraSwapMinAmount = Number(paraSwapData.destAmount);

    const paraSwapDataResult = await getParaSwapDataResult({
        swapData: {
            userAddress: account.address,
            srcToken: paraSwapRequestData.srcToken,
            destToken: paraSwapRequestData.destToken,
            srcDecimals: paraSwapRequestData.srcDecimals,
            destDecimals: paraSwapRequestData.destDecimals,
            partner: paraSwapRequestData.partner,
            slippage: 50,
            partnerAddress: '0x08a3c2A819E3de7ACa384c798269B3Ce1CD0e437',
            positiveSlippageToUser: false,
        },
        route: paraSwapData,
    });

    const inchData = await getInchSwapDstAmount({
        src: eeContractAddress,
        dst: usdtContractAddress.toLowerCase(),
        amount: value.toString(),
        from: account.address,
        slippage: DefiLamaSwapConfig.inchSlippage,
        referrer: '0xa43C3EDe995AA058B68B882c6aF16863F18c5330',
        disableEstimate: 'true',
    });

    const inchMinAmountOut = Number(inchData.toAmount);

    let cowMinAmountOut: number = 0;
    let cowData: ICowResponseData | null = null;

    if (value > BigInt(minCowSwapValue)) {
        cowData = await getCowSwapDstAmount({
            sellToken: wETHContractAddress,
            buyToken: usdtContractAddress.toLowerCase(),
            receiver: zeroAddress,
            appData: appData,
            partiallyFillable: false,
            sellTokenBalance: 'erc20',
            buyTokenBalance: 'erc20',
            from: zeroAddress,
            signingScheme: 'eip1271',
            onchainOrder: true,
            kind: 'sell',
            sellAmountBeforeFee: value.toString(),
        });

        cowMinAmountOut = Number(cowData.buyAmount);
    }

    const maxAmount = Math.max(paraSwapMinAmount, inchMinAmountOut, cowMinAmountOut);

    if (maxAmount === paraSwapMinAmount) {
        return await swapViaParaSwap(paraSwapDataResult, client, account, value);
    } else if (maxAmount === inchMinAmountOut) {
        return await swapViaInch(inchData, client, account, value);
    } else {
        return await swapViaCow(cowData == null ? null : cowData, client, account, value);
    }
}

async function swapViaParaSwap(
    data: IParaSwapResponseData,
    client: PublicClient,
    account: PrivateKeyAccount,
    value: bigint,
) {
    printInfo(`Выполняю модуль ${paraSwapModuleName}`);

    const walletClient = createWalletClient({
        chain: mainnet,
        transport: Config.ethereumRpc == null ? http() : http(Config.ethereumRpc),
    });

    const preparedTransaction = await walletClient.prepareTransactionRequest({
        account,
        to: <`0x${string}`>data.to,
        data: <`0x${string}`>data.data,
        value: value,
    });

    const signature = await walletClient.signTransaction(preparedTransaction).catch((e) => {
        printError(`Произошла ошибка во время выполнения модуля prepare ${paraSwapModuleName} ${e}`);
        return undefined;
    });

    if (signature !== undefined) {
        const hash = await walletClient.sendRawTransaction({ serializedTransaction: signature }).catch((e) => {
            printError(`Произошла ошибка во время выполнения модуля ${paraSwapModuleName} ${e}`);
            return false;
        });

        if (hash == false) {
            return false;
        }

        const url = `${mainnet.blockExplorers?.default.url + '/tx/' + hash}`;

        const transaction = await client
            .waitForTransactionReceipt({ hash: <`0x${string}`>hash })
            .then((result) => printSuccess(`Транзакция успешно отправлена. Хэш транзакции: ${url}\n`))
            .catch((e) => {
                printError(`Произошла ошибка во время выполнения модуля ${paraSwapModuleName} - ${e}`);
                return { request: undefined };
            });

        return true;
    }

    return false;
}

async function swapViaCow(
    data: ICowResponseData | null,
    client: PublicClient,
    account: PrivateKeyAccount,
    value: bigint,
) {
    if (data == null) {
        return false;
    }

    printInfo(`Выполняю модуль ${cowSwapModuleName}`);

    const walletClient = createWalletClient({
        chain: mainnet,
        transport: Config.ethereumRpc == null ? http() : http(Config.ethereumRpc),
    });

    const minAmountOut = Math.floor(Number(data.buyAmount) - Number(data.buyAmount) * cowSwapSlippage);

    const { request } = await client
        .simulateContract({
            address: cowContractAddress,
            abi: cowSwapABI,
            functionName: 'createOrder',
            args: [
                [usdtContractAddress, account.address, value, minAmountOut, appData, 0, data.validTo, false, data.id],
            ],
            account: account,
            value: value,
        })
        .then((request) => request as unknown as SimulateContractReturnType)
        .catch((e) => {
            printError(`Произошла ошибка во время выполнения модуля ${cowSwapModuleName} - ${e}`);
            return { request: undefined };
        });

    if (request !== undefined && request.account !== undefined) {
        const hash = await walletClient.writeContract(request).catch((e) => {
            printError(`Произошла ошибка во время выполнения модуля ${cowSwapModuleName} - ${e}`);
            return false;
        });

        if (hash == false) {
            return false;
        }

        const url = `${mainnet.blockExplorers?.default.url + '/tx/' + hash}`;

        const transaction = await client
            .waitForTransactionReceipt({ hash: <`0x${string}`>hash })
            .then((result) => printSuccess(`Транзакция успешно отправлена. Хэш транзакции: ${url}\n`))
            .catch((e) => {
                printError(`Произошла ошибка во время выполнения модуля ${cowSwapModuleName} - ${e}`);
                return { request: undefined };
            });

        return true;
    }

    return false;
}

async function swapViaInch(
    data: IInchSwapDataResponse,
    client: PublicClient,
    account: PrivateKeyAccount,
    value: bigint,
) {
    printInfo(`Выполняю модуль ${inchSwapModuleName}`);

    const walletClient = createWalletClient({
        chain: mainnet,
        transport: Config.ethereumRpc == null ? http() : http(Config.ethereumRpc),
    });

    const preparedTransaction = await walletClient.prepareTransactionRequest({
        account,
        to: <`0x${string}`>data.to,
        data: <`0x${string}`>data.data,
        value: value,
    });

    const signature = await walletClient.signTransaction(preparedTransaction).catch((e) => {
        printError(`Произошла ошибка во время выполнения модуля prepare ${inchSwapModuleName} ${e}`);
        return undefined;
    });

    if (signature !== undefined) {
        const hash = await walletClient.sendRawTransaction({ serializedTransaction: signature }).catch((e) => {
            printError(`Произошла ошибка во время выполнения модуля ${inchSwapModuleName} ${e}`);
            return false;
        });

        if (hash == false) {
            return false;
        }

        const url = `${mainnet.blockExplorers?.default.url + '/tx/' + hash}`;

        const transaction = await client
            .waitForTransactionReceipt({ hash: <`0x${string}`>hash })
            .then((result) => printSuccess(`Транзакция успешно отправлена. Хэш транзакции: ${url}\n`))
            .catch((e) => {
                printError(`Произошла ошибка во время выполнения модуля ${inchSwapModuleName} - ${e}`);
                return { request: undefined };
            });

        return true;
    }

    return false;
}
