import { Component, Input, EventEmitter } from '@angular/core';
import { AXHttpService } from '../../core/http/api';
import { PromisResult } from '../../core/base.class';
import { AXDataSourceReadParams, AXDataSourceRead } from './read-param';




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

    fetch(params: AXDataSourceReadParams = {}) {
        if (!this.params) this.params = {};
        if (this.remoteOperation) {
            Object.assign(this.params, params);
        }
        this.http.request({
            url: this.url,
            method: this.method,
            params: this.params,
            headers: this.headers
        }).result(c => {
            this.onDataReceived.emit(c);
        })
    }

}
