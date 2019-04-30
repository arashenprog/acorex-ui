import { Injectable } from '@angular/core';

@Injectable({ providedIn: "root" })
export class EventService {


    private list: any[] = [];

    public broadcast(key: string, options?: any): void {
        const d = this.list.find(c => c.key == key);
        if (d) {
            d.events.forEach(c => {
                c(options);
            });
        }

    }

    public on(key: string, callback: (options?: any) => void) {
        let d = this.list.find(c => c.key == key);
        if (!d) {
            d = { key: key, events: [] }
            this.list.push(d);
        }
        
        d.events.push(callback);
    }

    public destroy(key: string, callback: (options?: any) => void): void {
        debugger;
        const d = this.list.find(c => c.key == key);
        if (d) {
            //d.events = d.events.filter(c => c.callback != callback);
            d.events = [];
        }
    }
}