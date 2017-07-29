import * as fetchP from 'fetch-jsonp';

export type TimeoutInit = RequestInit & { timeout?: number } & fetchP.Options;

export interface FetchTimeout {
    (url: string, options: TimeoutInit, f?: typeof fetch): Promise<Response>;
}

export const fetchT: FetchTimeout = (url, options, f = fetch) => {
    const { timeout, ...opts } = options;
    return Promise.race([
        f(url, opts),
        new Promise((_, reject) => {
            setTimeout(() => {
                reject(new Error('request timeout'));
            }, timeout || 5000);
        })
    ]);
};
