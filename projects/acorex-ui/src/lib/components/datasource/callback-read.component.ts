import { Component, EventEmitter, Input } from '@angular/core';
import { PromisResult } from '../../core/base.class';
import { AXDataSourceReadParams, AXDataSourceRead } from './read-param';




@Component({
    selector: 'ax-callback-read',
    template: "",
    providers: [{ provide: AXDataSourceRead, useExisting: AXDataSourceCallbackRead }]
})
export class AXDataSourceCallbackRead extends AXDataSourceRead {

    onDataReceived: EventEmitter<any> = new EventEmitter<any>();

    @Input()
    provideData: (params: AXDataSourceReadParams) => PromisResult<any>;

    constructor() {
        super();
    }

    fetch(params: AXDataSourceReadParams) {
        this.provideData(params).then(data => {
            this.onDataReceived.emit(data);
        });
    }
}