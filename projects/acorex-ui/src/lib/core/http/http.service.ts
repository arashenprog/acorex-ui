import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpResult } from './http-result.class';
import { IHttpError } from './http-error.class';

import { AXHttpRequestOptions } from './http-request.class';
import { AX_HTTP_ERROR_INTERCEPTOR } from './http-error.service';
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
            this.http
                .get<T>(url, this.mapOptions(config))
                //.pipe(this.retry)
                .subscribe(data => {
                    this.handleResult(data, result, config);
                }, c => {
                    this.handleError(c, error, config);
                }, () => {
                    this.handleComplete(complete, config);
                });
        })
    }

    post<T>(url: string, config?: AXHttpRequestOptions): HttpResult<T> {
        return new HttpResult<T>((result?, error?, complete?) => {
            this.http
                .post<T>(url, this.mapOptions(config))
                //.pipe(this.retry)
                .subscribe(data => {
                    this.handleResult(data, result, config);
                }, c => {
                    this.handleError(c, error, config);
                }, () => {
                    this.handleComplete(complete, config);
                });
        })
    }


    private handleResult(data, result, config?: AXHttpRequestOptions) {
        if (result)
            result(data);
    }

    private handleComplete(complete, config?: AXHttpRequestOptions) {
        if (complete)
            complete();
    }

    private handleError(c, error, config?: AXHttpRequestOptions) {
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
            const err = this.injector.get(AX_HTTP_ERROR_INTERCEPTOR);
            if (err) err.intercept(r);
        }
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