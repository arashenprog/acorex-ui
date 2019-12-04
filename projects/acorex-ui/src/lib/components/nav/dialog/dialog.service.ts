import { Injectable } from "@angular/core";
import { AXDialogComponent } from './dialog.component';
import { AXPopupService } from '../popup/popup.service';

export class AXDialogAlertResult {
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

    close(action: (e?: any) => void): AXDialogAlertResult {
        this.closeAction = action;
        return this;
    }

}

export class AXDialogConfirmResult {
    private _executor: (okay: () => void, cancel: () => void, final: () => void) => void;
    constructor(
        executor: (okay: () => void, cancel: () => void, final: () => void) => void
    ) {
        this._executor = executor;
        setTimeout(() => {
            this._executor(this.okayAction, this.cancelAction, this.finalAction);
        }, 50);
    }

    private okayAction: () => void;
    private cancelAction: () => void;
    private finalAction: () => void;

    okay(action: () => void): AXDialogConfirmResult {
        this.okayAction = action;
        return this;
    }
    cancel(action: () => void): AXDialogConfirmResult {
        this.cancelAction = action;

        return this;
    }
    final(action: () => void) {
        this.finalAction = action;
    }
}


export class AXDialogResult {
    private _executor: (then: (name: string) => void, final: () => void) => void;
    constructor(
        executor: (then: (name: string) => void, final: () => void) => void
    ) {
        this._executor = executor;
        setTimeout(() => {
            this._executor(this.thenAction, this.finalAction);
        }, 50);
    }

    private thenAction: (name: string) => void;
    private finalAction: () => void;

    then(action: (name: string) => void): AXDialogResult {
        this.thenAction = action;
        return this;
    }

    final(action: () => void) {
        this.finalAction = action;
    }
}

@Injectable({ providedIn: "root" })
export class AXDialogService {

    constructor(private popupService: AXPopupService) {

    }

    alert(title: string, message: string): AXDialogAlertResult {
        return new AXDialogAlertResult((close) => {
            let popup = this.popupService.open(AXDialogComponent, {
                title: title,
                size: "sm",
                closable: false,
                data: {
                    message: message,
                    buttons: [
                        {
                            name: "confirm",
                            text: "Confirm",
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

    confirm(title: string, message: string): AXDialogConfirmResult {
        return new AXDialogConfirmResult((okay, cancel, final) => {
            let popup = this.popupService.open(AXDialogComponent, {
                title: title,
                size: "sm",
                closable: false,
                data: {
                    message: message,
                    buttons: [
                        {
                            name: "confirm",
                            text: "Confirm",
                            type: "success",
                            submitBehavior: true,
                            cancelBehavior: false,
                        },
                        {
                            name: "cancel",
                            text: "Cancel",
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


    show(title: string, message: string, ...buttons: { name: string, text: string, type: string }[]): AXDialogResult {
        return new AXDialogResult((then, final) => {
            let popup = this.popupService.open(AXDialogComponent, {
                title: title,
                size: "sm",
                closable: false,
                data: {
                    message: message,
                    buttons: buttons,
                    onClick: (e) => {
                        popup.dismiss()
                        if (then)
                            then(e.name);
                        if (final)
                            final();
                    }
                }
            })
        });
    }
}