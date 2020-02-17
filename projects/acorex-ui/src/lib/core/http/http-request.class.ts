export interface AXHttpRequestOptions {
    url?: any,
    params?: {
        [param: string]: any;
    },
    body?: {
        [param: string]: any;
    },
    headers?: {
        [header: string]: any;
    },
    method?: "get" | "post" | "put" | "delete";
}