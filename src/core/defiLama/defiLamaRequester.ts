import axios from 'axios';
import {
    ICowResponseData,
    ICowSwapData,
    IInchSwapData,
    IInchSwapDataResponse,
    IParaSwapData,
    IParaSwapResponseData,
    IParaSwapResultData,
    IPriceRoute,
} from '../../data/utils/interfaces';

export async function getParaSwapDstAmount(data: IParaSwapData): Promise<IPriceRoute> {
    const response = await axios
        .get(
            `https://apiv5.paraswap.io/prices/?srcToken=${data.srcToken}&destToken=${data.destToken}&amount=${data.amount}&srcDecimals=${data.srcDecimals}&destDecimals=${data.destDecimals}&partner=${data.partner}&side=${data.side}&network=${data.network}&excludeDEXS=${data.excludeDEXS}`,
            {
                headers: {
                    accept: '*/*',
                    'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
                    'if-none-match': 'W/"5a2-GUoAmmQpmma7I4fhml8eoaLua8g"',
                    origin: 'https://swap.defillama.com',
                    priority: 'u=1, i',
                    referer: 'https://swap.defillama.com/',
                    'sec-ch-ua': '"Not)A;Brand";v="99", "Google Chrome";v="127", "Chromium";v="127"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-platform': '"Windows"',
                    'sec-fetch-dest': 'empty',
                    'sec-fetch-mode': 'cors',
                    'sec-fetch-site': 'cross-site',
                    'user-agent':
                        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36',
                },
            },
        )
        .then(async (res) => {
            return res;
        })
        .catch(() => {
            return null;
        });

    return response!.data.priceRoute;
}

export async function getParaSwapDataResult(data: IParaSwapResultData): Promise<IParaSwapResponseData> {
    const response = await axios
        .post(
            'https://apiv5.paraswap.io/transactions/1',
            { ...data.swapData, priceRoute: { ...data.route }, srcAmount: data.route.srcAmount },
            {
                params: {
                    ignoreChecks: 'true',
                },
                headers: {
                    accept: '*/*',
                    'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
                    'content-type': 'application/json',
                    origin: 'https://swap.defillama.com',
                    priority: 'u=1, i',
                    referer: 'https://swap.defillama.com/',
                    'sec-ch-ua': '"Not)A;Brand";v="99", "Google Chrome";v="127", "Chromium";v="127"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-platform': '"Windows"',
                    'sec-fetch-dest': 'empty',
                    'sec-fetch-mode': 'cors',
                    'sec-fetch-site': 'cross-site',
                    'user-agent':
                        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36',
                },
            },
        )
        .then(async (res) => {
            return res;
        })
        .catch(() => {
            return null;
        });

    return { ...response!.data };
}

export async function getInchSwapDstAmount(data: IInchSwapData): Promise<IInchSwapDataResponse> {
    const response = await axios
        .get('https://api-defillama.1inch.io/v5.2/1/swap', {
            params: {
                ...data,
            },
            headers: {
                accept: '*/*',
                'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
                origin: 'https://swap.defillama.com',
                priority: 'u=1, i',
                referer: 'https://swap.defillama.com/',
                'sec-ch-ua': '"Not)A;Brand";v="99", "Google Chrome";v="127", "Chromium";v="127"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'cross-site',
                'user-agent':
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36',
            },
        })
        .then(async (res) => {
            return res;
        })
        .catch(() => {
            return null;
        });

    return {
        toAmount: response!.data.toAmount,
        to: response!.data.tx.to,
        data: response!.data.tx.data,
    };
}

export async function getCowSwapDstAmount(data: ICowSwapData): Promise<ICowResponseData> {
    const response = await axios
        .post(
            'https://api.cow.fi/mainnet/api/v1/quote',
            { ...data },
            {
                headers: {
                    accept: '*/*',
                    'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
                    'content-type': 'application/json',
                    origin: 'https://swap.defillama.com',
                    priority: 'u=1, i',
                    referer: 'https://swap.defillama.com/',
                    'sec-ch-ua': '"Not)A;Brand";v="99", "Google Chrome";v="127", "Chromium";v="127"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-platform': '"Windows"',
                    'sec-fetch-dest': 'empty',
                    'sec-fetch-mode': 'cors',
                    'sec-fetch-site': 'cross-site',
                    'user-agent':
                        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36',
                },
            },
        )
        .then(async (res) => {
            return res;
        })
        .catch(() => {
            return null;
        });

    return {
        validTo: response!.data.quote.validTo,
        id: response!.data.id,
        buyAmount: response!.data.quote.buyAmount,
    };
}
