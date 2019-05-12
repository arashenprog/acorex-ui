import { Injectable } from '@angular/core';
import { AXHttpErrorService as AXHttpErrorInterceptor } from '../core/http/http-error.service';
import { AXErrorService } from '../core/error/error.service';
import { IHttpError } from '../core/http/http-error.class';

@Injectable()
export class AXDefaultHttpErrorInterceptor implements AXHttpErrorInterceptor {

    constructor(private errorService: AXErrorService){

    }
    
    intercept(error: IHttpError)
    {
        this.errorService.handle(error.message);
    }
}
