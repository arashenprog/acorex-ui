import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpResult } from './http-result.class';
import { IHttpError } from './http-error.class';

@Injectable({
    providedIn: 'root',
})
export class AXHttpService {

    constructor(private http: HttpClient) { }

    get<T>(url: string): HttpResult<T> {
        return new HttpResult<T>((result?, error?, complete?) => {

            this.http.get<T>(url).toPromise().then(c => {
                if (result)
                    result(c);
            }).catch((c: HttpErrorResponse) => {
                let r: IHttpError = {
                    message: c.message,
                    status: c.status,
                    code: c.status.toString(),
                    handled: false,
                }
                if (error) {
                    error(r);
                }
                if(!r.handled)
                {
                    // error service
                }
            }).finally(() => {
                if (complete)
                    complete();
            })

        })
    }

}