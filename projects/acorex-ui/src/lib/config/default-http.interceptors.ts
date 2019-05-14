import { Injectable } from '@angular/core';
import { AXErrorService } from '../core/error/error.service';
import {
    AXHttpErrorEventInterceptor,
    AXHttpBeginEventInterceptor,
    AXHttpCompleteEventInterceptor,
    AXHttpRequestOptions,
    IHttpError
} from '../core/http/api';

@Injectable()
export class AXDefaultHttpErrorInterceptor implements AXHttpErrorEventInterceptor {

    constructor(private errorService: AXErrorService) {

    }

    intercept(request: AXHttpRequestOptions, error: IHttpError) {
        this.errorService.handle(error.message);
    }
}

@Injectable()
export class AXDefaultHttpBeginInterceptor implements AXHttpBeginEventInterceptor {

    constructor() {

    }

    intercept(request: AXHttpRequestOptions) {
        console.log("begin request");
    }
}

@Injectable()
export class AXDefaultHttpCompleteInterceptor implements AXHttpCompleteEventInterceptor {

    constructor() {

    }

    intercept(request: AXHttpRequestOptions) {
        console.log("begin complete");
    }
}
