import { Component, ContentChild, EventEmitter } from "@angular/core";
import { AXDataSourceRead } from './read-component';
import { PromisResult } from '../../core/base.class';
import { AXDataSourceReadParams } from './read-param';



@Component({
    selector: "ax-data-source",
    template: "<ng-content></ng-content>"
})
export class AXDataSourceComponent {

    @ContentChild(AXDataSourceRead)
    read: AXDataSourceRead;

    onDataReceived: EventEmitter<any> = new EventEmitter<any>();




    ngOnInit(): void {
        this.read.onDataReceived.subscribe(c => {
            this.onDataReceived.emit(c);
        })
    }

    ngAfterViewInit(): void {
        
    }


    fetch(params: AXDataSourceReadParams = {}):PromisResult<any> {
        return this.read.fetch(params);
    }
}
