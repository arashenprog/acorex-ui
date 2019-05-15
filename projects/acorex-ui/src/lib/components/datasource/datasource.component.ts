import { Component, ContentChild, EventEmitter } from "@angular/core";
import { AXDataSourceReadComponent } from './read-component';

@Component({
    selector: "ax-data-source",
    template: "<ng-content></ng-content>"
})
export class AXDataSourceComponent {

    @ContentChild(AXDataSourceReadComponent)
    private read: AXDataSourceReadComponent;

    onLoad: EventEmitter<any> = new EventEmitter<any>();


    ngOnInit(): void {
        this.read.onLoad.subscribe(c => {
            this.onLoad.emit(c);
        })
    }

    ngAfterViewInit(): void {
        this.refresh();
    }


    refresh() {
        this.read.read();
    }
}
