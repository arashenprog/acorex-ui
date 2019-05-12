import { IHttpError } from './http-error.class';
import { InjectionToken } from '@angular/core';

export const  AX_HTTP_ERROR_INTERCEPTOR = new InjectionToken<AXHttpErrorService>('ax.http.error');

export interface AXHttpErrorService {
    intercept(error: IHttpError);
}


