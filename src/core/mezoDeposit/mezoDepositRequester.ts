import axios from 'axios';
import * as console from 'node:console';
import { printError } from '../../data/logger/logPrinter';

export async function session(message: string, signature: string, nonce: string) {
    const response = await axios
        .post(
            'https://portal.api.mezo.org/api/v1/session',
            {
                message: message,
                signature: signature,
            },
            {
                headers: {
                    accept: '*/*',
                    'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
                    'content-type': 'application/json',
                    cookie: `MEZO_SESSION=${nonce}; zaraz-consent={"eQic":true}`,
                    origin: 'https://mezo.org',
                    priority: 'u=1, i',
                    referer: 'https://mezo.org/',
                    'sec-ch-ua': '"Not)A;Brand";v="99", "Google Chrome";v="127", "Chromium";v="127"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-platform': '"Windows"',
                    'sec-fetch-dest': 'empty',
                    'sec-fetch-mode': 'cors',
                    'sec-fetch-site': 'same-site',
                    'user-agent':
                        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36',
                },
            },
        )
        .catch((e) => {
            console.log(e);
        });
}

export async function getAccountStatus(address: string, nonce: string): Promise<boolean> {
    let isExists: boolean = false;
    const response = await axios
        .get(`https://portal.api.mezo.org/api/v1/accounts/${address}`, {
            headers: {
                authority: 'portal.api.mezo.org',
                accept: '*/*',
                'accept-language': 'ru',
                cookie: `MEZO_SESSION=${nonce}; zaraz-consent={"eQic":false}`,
                origin: 'https://mezo.org',
                referer: 'https://mezo.org/',
                'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-site',
                'user-agent':
                    'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36',
            },
        })
        .then((response) => {
            isExists = true;
        })
        .catch((error) => {
            if (error.response && error.response.status === 404) {
                if (error.response.data.status === 404 && error.response.data.message === 'Account not found') {
                    printError('Аккаунт не найден');
                } else {
                    printError(`Произошла ошибка: ${error.message}`);
                }
            } else {
                printError(`Произошла ошибка: ${error.message} ${error.error}`);
            }
        });

    return isExists;
}

export async function getNonce(): Promise<string> {
    const response = await axios.get('https://portal.api.mezo.org/api/v1/session', {
        headers: {
            authority: 'portal.api.mezo.org',
            accept: '*/*',
            'accept-language': 'ru',
            origin: 'https://mezo.org',
            referer: 'https://mezo.org/',
            'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
                'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36',
        },
    });

    return response!.data.nonce;
}

export async function getAddress(nonce: string) {
    const response = await axios.get('https://portal.api.mezo.org/api/v1/session', {
        headers: {
            authority: 'portal.api.mezo.org',
            accept: '*/*',
            'accept-language': 'ru',
            cookie: `MEZO_SESSION=${nonce}; zaraz-consent={"eQic":false}`,
            origin: 'https://mezo.org',
            referer: 'https://mezo.org/',
            'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
                'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36',
        },
    });
}

export async function registerUser(address: string, code: string, nonce: string) {
    const response = await axios.post(
        'https://portal.api.mezo.org/api/v1/accounts',
        {
            address: address,
            code: code,
        },
        {
            headers: {
                authority: 'portal.api.mezo.org',
                accept: '*/*',
                'accept-language': 'ru',
                'content-type': 'application/json',
                cookie: `MEZO_SESSION=${nonce}; zaraz-consent={"eQic":false}`,
                origin: 'https://mezo.org',
                referer: 'https://mezo.org/',
                'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-site',
                'user-agent':
                    'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36',
            },
        },
    );
}
