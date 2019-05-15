import { IHttpError } from './http-error.class';
import { InjectionToken } from '@angular/core';
import { AXHttpRequestOptions } from './http-request.class';
import { PromisResult } from '../base.class';

export const AX_HTTP_EVENT_INTERCEPTOR = new InjectionToken<AXHttpEventInterceptor>('ax.http.events');

export interface AXHttpEventInterceptor {
    begin(request: AXHttpRequestOptions): PromisResult<AXHttpRequestOptions>;
    success(request: AXHttpRequestOptions, result: any): PromisResult<any>;
    complete(request: AXHttpRequestOptions);
    error(request: AXHttpRequestOptions, error: IHttpError);
}


