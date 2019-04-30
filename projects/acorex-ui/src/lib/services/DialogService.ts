import { Injectable } from "@angular/core";
import { PopupService } from "./PopupService";
import { AXDialogComponent } from "../components/popup/dialog.component";


export class DialogAlertResult {
    private _executor: (close: (e?: any) => void) => void;
    constructor(
        executor: (close: (e?: any) => void) => void
    ) {
        this._executor = executor;
        setTimeout(() => {
            this._executor(this.closeAction);
        }, 50);
    }

    private closeAction: (e?: any) => void;

    close(action: (e?: any) => void): DialogAlertResult {
        this.closeAction = action;
        return this;
    }

}

export class DialogConfirmResult {
    private _executor: (okay: () => void, cancel: () => void, finall: () => void) => void;
    constructor(
        executor: (okay: () => void, cancel: () => void, finall: () => void) => void
    ) {
        this._executor = executor;
        setTimeout(() => {
            this._executor(this.okayAction, this.cancelAction, this.finalAction);
        }, 50);
    }

    private okayAction: () => void;
    private cancelAction: () => void;
    private finalAction: () => void;

    okay(action: () => void): DialogConfirmResult {
        this.okayAction = action;
        return this;
    }
    cancel(action: () => void): DialogConfirmResult {
        this.cancelAction = action;

        return this;
    }
    final(action: () => void) {
        this.finalAction = action;
    }
}


@Injectable({ providedIn: "root" })
export class DialogService {
    constructor(private popupService: PopupService) {

    }

    alert(title: string, message: string): DialogAlertResult {
        return new DialogAlertResult((close) => {
            let popup = this.popupService.open(AXDialogComponent, {
                title: title,
                size: "sm",
                closable: false, data: {
                    message: message,
                    buttons: [
                        {
                            name: "confirm",
                            text: "تایید",
                            type: "success",
                            submitBehavior: true,
                        }
                    ],
                    onClick: (e) => {
                        popup.dismiss()
                        close();
                    }
                }
            })
        });
    }


    confirm(title: string, message: string): DialogConfirmResult {
        return new DialogConfirmResult((okay, cancel, final) => {
            let popup = this.popupService.open(AXDialogComponent, {
                title: title,
                size: "sm",
                closable: false, data: {
                    message: message,
                    buttons: [
                        {
                            name: "confirm",
                            text: "تایید",
                            type: "success",
                            submitBehavior: true,
                            cancelBehavior: false,
                        },
                        {
                            name: "cancel",
                            text: "انصراف",
                            type: "danger",
                            submitBehavior: false,
                            cancelBehavior: true,
                        }
                    ],
                    onClick: (e) => {
                        popup.dismiss()
                        if (e.name == "confirm" && okay) {

                            okay();
                        }
                        if (e.name == "cancel" && cancel) {
                            cancel();
                        }
                        if (final)
                            final();

                    }
                }
            })
        });
    }

}