import { IHttpError } from './http-error.class';
import { InjectionToken } from '@angular/core';
import { AXHttpRequestOptions } from './http-request.class';

// export const  AX_HTTP_ERROR_EVENT_INTERCEPTOR = new InjectionToken<AXHttpErrorEventInterceptor>('ax.http.error');

// export interface AXHttpErrorEventInterceptor {
//     intercept(request:AXHttpRequestOptions,error: IHttpError);
// }


// export const  AX_HTTP_BEGIN_EVENT_INTERCEPTOR = new InjectionToken<AXHttpBeginEventInterceptor>('ax.http.begin');

// export interface AXHttpBeginEventInterceptor {
//     intercept(request:AXHttpRequestOptions);
// }

// export const  AX_HTTP_COMPLETE_EVENT_INTERCEPTOR = new InjectionToken<AXHttpCompleteEventInterceptor>('ax.http.complete');

// export interface AXHttpCompleteEventInterceptor {
//     intercept(request:AXHttpRequestOptions);
// }


// export const  AX_HTTP_RESULT_EVENT_INTERCEPTOR = new InjectionToken<AXHttpResultEventInterceptor>('ax.http.result');

// export interface AXHttpResultEventInterceptor {
//     intercept(request:AXHttpRequestOptions,result:any);
// }


export const  AX_HTTP_EVENT_INTERCEPTOR = new InjectionToken<AXHttpEventInterceptor>('ax.http.events');

export interface AXHttpEventInterceptor {
    begin(request:AXHttpRequestOptions);
    success(request:AXHttpRequestOptions,result:any);
    complete(request:AXHttpRequestOptions);
    error(request:AXHttpRequestOptions,error: IHttpError);
}


