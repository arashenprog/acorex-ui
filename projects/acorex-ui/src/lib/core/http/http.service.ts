import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { HttpResult } from './http-result.class';
import { IHttpError } from './http-error.class';

import { AXHttpRequestOptions } from './http-request.class';
import {
    AX_HTTP_ERROR_EVENT_INTERCEPTOR,
    AX_HTTP_COMPLETE_EVENT_INTERCEPTOR,
    AX_HTTP_BEGIN_EVENT_INTERCEPTOR,
    AX_HTTP_RESULT_EVENT_INTERCEPTOR
} from './http-events.interceptor';
// import { catchError, retry, retryWhen, mergeMap, delay, switchMap, scan, takeWhile, flatMap } from 'rxjs/operators';
// import { of, concat, throwError } from 'rxjs';


@Injectable({ providedIn: "root" })
export class AXHttpService {

    constructor(private http: HttpClient, private injector: Injector) { }

    // private retry = retryWhen(errors => {
    //     let retries = 0;
    //     return errors.pipe(delay(1500),
    //         flatMap(err => {
    //             if (retries-- > 0) {
    //                 return of(err);
    //             }
    //         })
    //     );
    // });

    get<T>(url: string, config?: AXHttpRequestOptions): HttpResult<T> {
        return new HttpResult<T>((result?, error?, complete?) => {
            this.handleBegin(config);
            this.http
                .get<T>(url, this.mapOptions(config))
                //.pipe(this.retry)
                .subscribe(data => {
                    this.handleResult(data, result, complete, config);
                }, c => {
                    this.handleError(c, error, complete, config);

                });
        })
    }

    post<T>(url: string, config?: AXHttpRequestOptions): HttpResult<T> {
        return new HttpResult<T>((result?, error?, complete?) => {
            this.handleBegin(config);
            this.http
                .post<T>(url, this.mapOptions(config))
                //.pipe(this.retry)
                .subscribe(data => {
                    this.handleResult(data, result, complete, config);
                }, c => {
                    this.handleError(c, error, complete, config);
                });
        })
    }


    private handleResult(data, result, complete, config?: AXHttpRequestOptions) {
        const event = this.injector.get(AX_HTTP_RESULT_EVENT_INTERCEPTOR);
        if (event)
            event.intercept(config, data);
        //
        if (result)
            result(data);
        this.handleComplete(complete, config);
    }
    private handleBegin(config?: AXHttpRequestOptions) {
        const event = this.injector.get(AX_HTTP_BEGIN_EVENT_INTERCEPTOR);
        if (event) event.intercept(config);
    }

    private handleComplete(complete, config?: AXHttpRequestOptions) {
        if (complete)
            complete();
        const event = this.injector.get(AX_HTTP_COMPLETE_EVENT_INTERCEPTOR);
        if (event) event.intercept(config);
    }

    private handleError(c, error, complete, config?: AXHttpRequestOptions) {
        let r: IHttpError = {
            message: c.message,
            status: c.status,
            code: c.status.toString(),
            handled: false,
        }
        if (error) {
            error(r);
        }
        if (!r.handled) {
            const err = this.injector.get(AX_HTTP_ERROR_EVENT_INTERCEPTOR);
            if (err) err.intercept(config, r);
        }
        this.handleComplete(complete, config);
    }

    private mapOptions(options?: AXHttpRequestOptions) {
        let headers = new HttpHeaders();
        let params = new HttpParams();
        if (!options) return {};
        for (const key in options.headers) {
            if (options.headers.hasOwnProperty(key)) {
                const value = options.headers[key];
                headers = headers.set(key, value)
            }
        }

        for (const key in options.params) {
            if (options.params.hasOwnProperty(key)) {
                const value = options.params[key];
                params = params.set(key, value);
            }
        }
        return {
            headers: headers,
            params: params
        };
    }

}