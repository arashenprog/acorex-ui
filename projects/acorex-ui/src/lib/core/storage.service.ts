import { Injectable } from '@angular/core';

@Injectable()
export class AXStorageService {
    get(key: string): any {
       return <any>localStorage.getItem(key)
    }

    set(key: string, value: any): void {
       localStorage.setItem(key, value as string);
    }
}