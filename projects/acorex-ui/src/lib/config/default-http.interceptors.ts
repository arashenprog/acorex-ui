import { Injectable } from '@angular/core';
import { AXErrorService } from '../core/error/error.service';
import {
    AXHttpRequestOptions,
    IHttpError,
    AXHttpEventInterceptor
} from '../core/http/api';

@Injectable()
export class AXDefaultHttpInterceptor implements AXHttpEventInterceptor {

    begin(request: AXHttpRequestOptions) {
        request.headers = { "autentication": "brear askdjaskjhdj;laksnbdkjakjsdk" };
        request.params = { "randoem": Math.random() };
        console.log("begin request", request);
    }
    success(request: AXHttpRequestOptions, result: any) {

    }
    complete(request: AXHttpRequestOptions) {

    }
    error(request: AXHttpRequestOptions, error: IHttpError) {
        this.errorService.handle(error.message)
    }

    constructor(private errorService: AXErrorService) {

    }


}
