import { Injectable } from '@angular/core';

@Injectable()
export class AXErrorService {
    handle(message: string) {
        console.error(message);
        alert(message);
    }
}