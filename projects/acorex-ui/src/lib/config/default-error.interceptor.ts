import { AXErrorDisplayInterceptor } from '../core/error/error.service';
import { Injectable } from '@angular/core';
import { AXToastService } from '../components/layout/toast/toast.service';

@Injectable()
export class AXDefaultErrorDisplayInterceptor implements AXErrorDisplayInterceptor {
    constructor(private toast: AXToastService) {
    }

    show(message: string) {
        console.error(message);
        this.toast.error(message, {
            timeOut: 3000
        });
    }
}