import { EventEmitter, SimpleChanges, OnChanges } from "@angular/core";
import { ClosingEventArgs, ClosingAction } from 'acorex-ui';

export abstract class AXBasePageComponent implements OnChanges  {
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