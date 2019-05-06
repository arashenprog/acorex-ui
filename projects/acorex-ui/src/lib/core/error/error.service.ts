import { Injectable } from '@angular/core';

@Injectable({ providedIn: "root" })
export class AXErrorService {
    handle(message: string) {
        console.error(message);
        alert(message);
    }
}