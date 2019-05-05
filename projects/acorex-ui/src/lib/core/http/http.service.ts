import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { HttpResult } from './http-result.class';
import { IHttpError } from './http-error.class';
import { AXErrorService } from '../error/error.service';

import { AXHttpRequestOptions } from './http-request.class';
// import { catchError, retry, retryWhen, mergeMap, delay, switchMap, scan, takeWhile, flatMap } from 'rxjs/operators';
// import { of, concat, throwError } from 'rxjs';


@Injectable()
export class AXHttpService {

    constructor(private http: HttpClient, private error: AXErrorService) { }

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
                    this.handleResult(data, result,config);
                }, c => {
                    this.handleError(c, error,config);
                }, () => {
                    this.handleComplete(complete,config);
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
            this.error.handle(r.message);
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