import { AXErrorService } from '../core/error/error.service';
import { Injectable } from '@angular/core';
import { AXToastService } from '../components/layout/toast/toast.service';

@Injectable()
export class AXDefaultErrorService extends AXErrorService {
    constructor(private toast: AXToastService) {
        super();
    }

    handle(message: string) {
        console.error(message);
        this.toast.error(message, {
            timeOut: 3000
        });
    }
}