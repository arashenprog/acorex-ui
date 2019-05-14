import { IHttpError } from './http-error.class';
import { InjectionToken } from '@angular/core';
import { AXHttpRequestOptions } from './http-request.class';

export const  AX_HTTP_ERROR_EVENT_INTERCEPTOR = new InjectionToken<AXHttpErrorEventInterceptor>('ax.http.error');

export interface AXHttpErrorEventInterceptor {
    intercept(request:AXHttpRequestOptions,error: IHttpError);
}


export const  AX_HTTP_BEGIN_EVENT_INTERCEPTOR = new InjectionToken<AXHttpBeginEventInterceptor>('ax.http.begin');

export interface AXHttpBeginEventInterceptor {
    intercept(request:AXHttpRequestOptions);
}

export const  AX_HTTP_COMPLETE_EVENT_INTERCEPTOR = new InjectionToken<AXHttpCompleteEventInterceptor>('ax.http.complete');

export interface AXHttpCompleteEventInterceptor {
    intercept(request:AXHttpRequestOptions);
}


