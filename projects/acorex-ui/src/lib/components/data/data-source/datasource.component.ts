import { Component, ContentChild, EventEmitter } from "@angular/core";
import { PromisResult } from '../../../core/base.class';
import { AXDataSourceReadParams, AXDataSourceRead } from './read-param';



@Component({
    selector: "ax-data-source",
    template: "<ng-content></ng-content>"
})
export class AXDataSourceComponent {

    @ContentChild(AXDataSourceRead, { static: true })
    read: AXDataSourceRead;

    onDataReceived: EventEmitter<any> = new EventEmitter<any>();




    ngOnInit(): void {
        if (this.read) {
            this.read.onDataReceived.subscribe(c => {
                this.onDataReceived.emit(c);
            })
        }
    }

    ngAfterViewInit(): void {

    }


    fetch(params: AXDataSourceReadParams = {}) {
        if (this.read) {
            this.read.fetch(params);
        }
    }
}
