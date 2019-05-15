import { Component, Input, EventEmitter } from '@angular/core';
import { AXHttpService } from '../../core/http/api';


export abstract class AXDataSourceRead {
    abstract read(): void;
    abstract onLoad: EventEmitter<any>;
}

@Component({
    selector: 'ax-remote-read',
    template: "",
    providers: [{ provide: AXDataSourceRead, useExisting: AXDataSourceRemoteRead }]
})
export class AXDataSourceRemoteRead extends AXDataSourceRead {

    constructor(private http: AXHttpService) {
        super();
    }

    @Input()
    url: string;
    @Input()
    params: string;

    @Input()
    headers: string;

    @Input()
    method: "get" | "post" = "get";

    onLoad: EventEmitter<any> = new EventEmitter<any>();

    read(): void {
        debugger;
        if (this.method == "get") {
            this.http.get(this.url, {
                params: this.params,
                headers: this.headers
            }).result(c => {
                this.onLoad.emit(c);
            })
        }
    }

}
