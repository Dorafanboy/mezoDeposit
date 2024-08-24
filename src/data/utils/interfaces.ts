import { PrivateKeyAccount } from 'viem';

export interface IBridgeRange {
    readonly minRange: number;
    readonly maxRange: number;
}

export interface IFixedRange extends IBridgeRange {}

export interface IDelayRange extends IBridgeRange {}

export type sideName = 'BUY' | 'SELL';

export interface IParaSwapData {
    readonly srcToken: string;
    readonly destToken: string;
    readonly amount: string;
    readonly srcDecimals: number;
    readonly destDecimals: number;
    readonly partner: string;
    readonly side: string;
    readonly network: number;
    readonly excludeDEXS: string[];
}

export interface IParaSwapDataWithAddress extends Omit<IParaSwapData, 'amount' | 'excludeDEXS' | 'side' | 'network'> {
    readonly userAddress: string;
    readonly slippage: number;
    readonly partnerAddress: string;
    readonly positiveSlippageToUser: boolean;
}

export interface IInchSwapData {
    readonly src: string;
    readonly dst: string;
    readonly amount: string;
    readonly from: string;
    readonly slippage: string;
    readonly referrer: string;
    readonly disableEstimate: string;
}

export interface IInchSwapDataResponse {
    readonly toAmount: string;
    readonly to: string;
    readonly data: string;
}

export interface IZeroXSwapData {
    readonly protocol: string;
    readonly chain: string;
    readonly from: string;
    readonly to: string;
    readonly amount: string;
    readonly userAddress: string;
}

export interface ICowSwapData {
    readonly sellToken: string;
    readonly buyToken: string;
    readonly receiver: string;
    readonly appData: string;
    readonly partiallyFillable: boolean;
    readonly sellTokenBalance: string;
    readonly buyTokenBalance: string;
    readonly from: string;
    readonly signingScheme: string;
    readonly onchainOrder: boolean;
    readonly kind: string;
    readonly sellAmountBeforeFee: string;
}

export interface ISwapExchange {
    readonly exchange: string;
    readonly srcAmount: string;
    readonly destAmount: string;
    readonly percent: number;
    readonly poolAddresses: readonly string[];
    readonly data: {
        readonly router: string;
        readonly path: readonly string[];
        readonly factory: string;
        readonly initCode: string;
        readonly feeFactor: number;
        readonly pools: readonly {
            readonly address: string;
            readonly fee: number;
            readonly direction: boolean;
        }[];
        readonly gasUSD: string;
    };
}

export interface IBestRoute {
    readonly percent: number;
    readonly swaps: readonly {
        readonly srcToken: string;
        readonly srcDecimals: number;
        readonly destToken: string;
        readonly destDecimals: number;
        readonly swapExchanges: readonly ISwapExchange[];
    }[];
}

export interface IPriceRoute {
    readonly blockNumber: number;
    readonly network: number;
    readonly srcToken: string;
    readonly srcDecimals: number;
    readonly srcAmount: string;
    readonly destToken: string;
    readonly destDecimals: number;
    readonly destAmount: string;
    readonly bestRoute: readonly IBestRoute[];
    readonly gasCostUSD: string;
    readonly gasCost: string;
    readonly side: string;
    readonly version: string;
    readonly contractAddress: string;
    readonly tokenTransferProxy: string;
    readonly contractMethod: string;
    readonly partnerFee: number;
    readonly srcUSD: string;
    readonly destUSD: string;
    readonly partner: string;
    readonly maxImpactReached: boolean;
    readonly hmac: string;
}

export interface IParaSwapResultData {
    readonly swapData: IParaSwapDataWithAddress;
    readonly route: IPriceRoute;
}

export interface IParaSwapResponseData {
    readonly to: string;
    readonly data: string;
}

export interface ICowResponseData {
    readonly buyAmount: bigint;
    readonly validTo: number;
    readonly id: number;
}
