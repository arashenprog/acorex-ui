import { EventEmitter} from "@angular/core";
import { ClosingAction, ClosingEventArgs } from './popup/popup.service';

export abstract class AXBasePageComponent  {
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
}