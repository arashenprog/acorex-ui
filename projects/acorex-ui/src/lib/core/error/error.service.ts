import { InjectionToken, Injectable, Injector } from '@angular/core';

export const  AX_ERROR_DISPLAY_INTERCEPTOR = new InjectionToken<AXErrorDisplayInterceptor>('ax.error');

export interface AXErrorDisplayInterceptor {
    show(message: string);
}

@Injectable({providedIn:"root"})
export class AXErrorService {

    constructor(private injector: Injector){

    }
    
    handle(message: string)
    {
        const instance = this.injector.get(AX_ERROR_DISPLAY_INTERCEPTOR);
        if (instance) instance.show(message);
    }
}