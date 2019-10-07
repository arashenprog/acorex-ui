import { EventEmitter} from "@angular/core";
import { ClosingAction, ClosingEventArgs } from "./popup/popup.events";

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
        //console.log("ngOnDestroy",this);
        this.closeEvent.unsubscribe();
    }

    ngDoCheck(): void {
        //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
        //Add 'implements DoCheck' to the class.
        //console.log("ngDoCheck",this);
    }
}