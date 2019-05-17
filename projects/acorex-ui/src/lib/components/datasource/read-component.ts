import { Component, Input, EventEmitter } from '@angular/core';
import { AXHttpService } from '../../core/http/api';
import { PromisResult } from '../../core/base.class';
import { AXDataSourceReadParams } from './read-param';


export abstract class AXDataSourceRead {
    abstract fetch(params: AXDataSourceReadParams): PromisResult<any>;
    abstract onDataReceived: EventEmitter<any>;
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
    params: any;

    @Input()
    headers: any;

    @Input()
    method: "get" | "post" = "get";

    @Input()
    remoteOperation: boolean = false;

    onDataReceived: EventEmitter<any> = new EventEmitter<any>();

    fetch(params: AXDataSourceReadParams = {}): PromisResult<any> {
        if (!this.params) this.params = {};
        if (this.remoteOperation) {
            Object.assign(this.params, params);
        }
        return new PromisResult((resolve) => {
            this.http.request({
                url: this.url,
                method: this.method,
                params: this.params,
                headers: this.headers
            }).result(c => {
                if (resolve)
                    resolve(c);
                this.onDataReceived.emit(c);
            })
        })
    }

}
