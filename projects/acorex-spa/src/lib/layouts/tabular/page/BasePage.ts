import { ClosingEventArgs, ClosingAction } from "shared/services/PopupService";
import { EventEmitter, SimpleChanges, OnChanges } from "@angular/core";
import { e } from "@angular/core/src/render3";

export abstract class BasePage implements OnChanges  {
    //closeHandler: Function;

    closeEvent: EventEmitter<ClosingEventArgs> = new EventEmitter<ClosingEventArgs>();

    constructor() {

    }

    close(data?: any) {
        let res = { data: data };
        this.closeEvent.emit(res);
    }

    onReceiveData(data: any) {

    }

    onClosing(e: ClosingAction) {
        e.resolve();
    }


    ngOnDestroy() {
        this.closeEvent.unsubscribe();
    }

    ngOnChanges(changes: SimpleChanges) {

        debugger;

    }


}