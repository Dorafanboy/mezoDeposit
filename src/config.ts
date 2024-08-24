import { IBridgeRange, IDelayRange, IFixedRange } from './data/utils/interfaces';

export class Config {
    public static readonly isShuffleWallets: boolean = true; // перемешивать ли строки в текстовом файле для приватных ключей
    public static readonly maxGwei = 11; // до какого гвея будет использоваться скрипт
    public static readonly delayBetweenGweiCheck: IDelayRange = { minRange: 0.3, maxRange: 1 }; // задержка перед получением нового гвея (в минутах)
    public static readonly retryCount: number = 15; // сколько попыток будет, чтобы получить новую сеть, значение для бриджа
    public static readonly delayBetweenAction: IDelayRange = { minRange: 2.2, maxRange: 4 }; // задержка между действиями (в секундах) в случае ошибки
    public static readonly delayBetweenAccounts: IDelayRange = { minRange: 37, maxRange: 45 }; // задержка между аккаунтами (в минутах)
    public static readonly delayBetweenModules: IDelayRange = { minRange: 0.5, maxRange: 1.5 }; // задержка между модулями (в минутах)
    public static readonly ethereumRpc = 'https://eth.meowrpc.com'; // RPC для Ethereum
}

export class DefiLamaSwapConfig {
    public static readonly minUsdtSwapAmount: number = 0.3; // ниже какого баланса USDT не надо свапать в usdt
    public static readonly ethSwapAmount: { range: IBridgeRange; fixed: IFixedRange } = {
        range: { minRange: 0.00003, maxRange: 0.0001 },
        fixed: { minRange: 6, maxRange: 8 },
    }; // сколько свапать eth в USDT, fixed - количество символов после запятой, т.е если выпадет рандомное количество range = 0.00001552254241 fixed будет 7
    public static readonly delayAfterSwap: IDelayRange = { minRange: 0.5, maxRange: 1.5 }; // задержка после свапа
    public static readonly inchSlippage: string = '0.5'; // слиппадж если будет выбрать 1inch свап, 0.1/0.5/1
}

export class MezoConfig {
    public static readonly refCodes: string[] = ['THR3S', 'ETHNA', 'WRMHL', 'XVERS', 'CURVE']; // реф коды
    public static readonly delayBeforeRegistration: IDelayRange = { minRange: 0.7, maxRange: 1 }; // задержка перед регистрацией в mezo (в минутах)
    public static readonly isDepositAll: boolean = false; // депозитить ли весь баланс USDT в Mezo, если нет, то будет браться процент из depositPercent
    public static readonly depositPercent: { range: IBridgeRange; fixed: IFixedRange } = {
        range: { minRange: 75, maxRange: 77 },
        fixed: { minRange: 3, maxRange: 6 },
    }; // сколько процентов от имеющегося кол-ва будет оставаться на аккаунте USDT
    public static readonly depositPeriod: number[] = [23587200]; // на сколько лочить USDT, 23587200 = 9 месяцев, 14515200 = 6 месяцев, 4838400 = 2 месяца,
    // если указать больше 1го, будет выбирать рандомно один из тех, что указаны
}
