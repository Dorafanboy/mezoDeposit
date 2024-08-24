import { IBridgeRange, IFixedRange } from './interfaces';
import { formatUnits, Hex, parseEther, parseUnits, PublicClient } from 'viem';
import { Config } from '../../config';
import { delay } from '../helpers/delayer';
import { printInfo } from '../logger/logPrinter';
import { erc20ABI } from '../../abis/erc20';
import { offset } from './utilsData';

export async function getValue(
    client: PublicClient,
    address: Hex,
    bridgeRange: IBridgeRange,
    fixedRange: IFixedRange,
    isBridge: boolean,
    tokenBalance: bigint = BigInt(-1),
): Promise<bigint> {
    const balance = tokenBalance == BigInt(-1) ? await getBridgeBalance(client, address) : tokenBalance;

    let value = 0,
        fixed,
        currentTry = 0;
    let weiValue: bigint = parseEther('0');
    const decimals = isBridge ? 18 : 6;

    if (balance == parseEther('0')) {
        return BigInt(-1);
    }

    while (weiValue > balance || weiValue == parseEther('0')) {
        if (currentTry < Config.retryCount) {
            value = Math.random() * (bridgeRange.maxRange - bridgeRange.minRange) + bridgeRange.minRange;
            fixed = Math.floor(Math.random() * (fixedRange.maxRange - fixedRange.minRange) + fixedRange.minRange);

            weiValue = parseEther(value.toFixed(fixed));
            const compareValue = isBridge ? weiValue : parseUnits(value.toFixed(fixed), 6);

            if (compareValue > balance) {
                printInfo(
                    `Полученное значение для ${isBridge ? 'бриджа' : 'свапа'} ${value.toFixed(
                        fixed,
                    )} больше чем баланс ${Number(formatUnits(balance, decimals)).toFixed(fixed)}`,
                );

                currentTry++;
                await delay(Config.delayBetweenAction.minRange, Config.delayBetweenAction.maxRange, false);
            } else {
                return isBridge ? weiValue : parseUnits(value.toFixed(fixed), 6);
            }
        } else {
            printInfo(
                `Не было найдено необходимого кол-во средств для ${isBridge ? 'бриджа' : 'свапа'} в сети ${
                    client.chain?.name
                }\n`,
            );

            return BigInt(-1);
        }
    }

    return isBridge ? weiValue : parseUnits(value.toFixed(fixed), 6);
}

export async function getBridgeBalance(client: PublicClient, address: Hex) {
    const balance = await client.getBalance({
        address: address,
    });

    await checkZeroBalance(client, balance);

    return balance;
}

export async function getSwapBalance(client: PublicClient, address: Hex, tokenAddress: Hex, tokenName: string = '') {
    const balance = await client.readContract({
        address: tokenAddress,
        abi: erc20ABI,
        functionName: 'balanceOf',
        args: [address],
    });

    await checkZeroBalance(client, parseUnits(balance.toString(), 0), tokenName);

    return balance;
}

async function checkZeroBalance(client: PublicClient, balance: bigint, tokenName: string = '') {
    if (balance == parseEther('0')) {
        printInfo(`Баланс аккаунта в токене ${tokenName} сети ${client.chain?.name} равен нулю\n`);

        await delay(1, 2, false);

        return parseEther('0');
    }
}

export function getMessage(address: string, nonce: string): string {
    const issuedAt = new Date();
    const expiredIn = new Date(issuedAt.getTime() + 1000000000);

    return `mezo.org wants you to sign in with your Ethereum account:\n${address}\n\n\nURI: https://mezo.org\nVersion: 1\nChain ID: 1\nNonce: ${nonce}\nIssued At: ${issuedAt.toISOString()}\nExpiration Time: ${expiredIn.toISOString()}`;
}

export async function getValueFromPercent(
    rangePercent: IBridgeRange,
    fixedPercent: IFixedRange,
    tokenName: string,
    balance: bigint,
) {
    const fixed = Math.floor(Math.random() * (fixedPercent.maxRange - fixedPercent.minRange) + fixedPercent.minRange);
    const percent = (Math.random() + offset) * (rangePercent.maxRange - rangePercent.minRange) + rangePercent.minRange;

    printInfo(`Буду оставлять ${percent.toFixed(fixed)}% на аккаунте ${tokenName}`);

    const scaleFactor = BigInt(10 ** fixed);
    const percentBigInt = BigInt(Math.round(percent * Number(scaleFactor)));
    const bridgeValue = (BigInt(balance.toString()) * percentBigInt) / (scaleFactor * BigInt(100));

    printInfo(`Оставлю на балансе аккаунта ${formatUnits(bridgeValue, 6)} ${tokenName}`);

    return balance - bridgeValue;
}
