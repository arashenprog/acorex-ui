import { Injectable, EventEmitter } from "@angular/core";
import { ClosingEventArgs, ClosedEventArgs, ClosingAction } from "../popup/popup.service";

export interface AXTabPage {
    title: string;
    closable: boolean;
    content: any;
    data?: any;
    id: number;
    uid?: string;
    isBusy?: false;
    active: boolean;
    closed?: Function;
    closing?: (x: ClosingAction) => void;
    send?: Function;
}

export interface AXTabPageMessage {
    tab: AXTabPage;
    data: any;
}



export class AXTabPageResult {
    private _executor: (closing: (e?: ClosingAction) => void, closed: (e?: ClosedEventArgs) => void) => void;
    constructor(private tab: AXTabPage,
        executor: (closing: (e?: ClosingAction) => void, closed: (e?: ClosingEventArgs) => void) => void
    ) {
        this.tab = tab;
        this._executor = executor;
        setTimeout(() => {
            this._executor(this.closingAction, this.closedAction);
        }, 50);
    }


    private closingAction: (e?: ClosingAction) => void;
    private closedAction: (e?: ClosedEventArgs) => void;


    closed(action: (e?: ClosedEventArgs) => void): AXTabPageResult {
        this.closedAction = action;
        return this;
    }
    closing(action: (e?: ClosingAction) => void): AXTabPageResult {
        this.closingAction = action;
        return this;
    }

    send(data: any) {
        this.tab.send(data);
    }
}

@Injectable({ providedIn: "root" })
export class AXTabPageService {

    tabs: AXTabPage[] = new Array<AXTabPage>();


    opened: EventEmitter<AXTabPage> = new EventEmitter<AXTabPage>();
    closed: EventEmitter<AXTabPage> = new EventEmitter<AXTabPage>();
    received: EventEmitter<AXTabPageMessage> = new EventEmitter<AXTabPageMessage>();


    constructor() {

    }

    open(content: any, title: string): AXTabPageResult;
    open(content: any, title: string, data?: any): AXTabPageResult;
    open(options: { content: any, title: string, closable?: boolean, data?: any, uid?: string }): AXTabPageResult;

    open(arg1, arg2?, arg3?) {
        let newTab: AXTabPage;
        let id = new Date().getTime();
        if (typeof (arg1) === 'object') {
            const options = Object.assign({ closable: true }, arg1);
            newTab = {
                id: id,
                title: options.title,
                closable: options.closable,
                content: options.content,
                data: options.data,
                uid: options.uid,
                active: true
            };
        }
        else {
            newTab = {
                id: id,
                title: arg2,
                closable: true,
                content: arg1,
                data: arg3,
                active: true,
            };
        }

        newTab.send = (data: any) => {
            this.sendMessage({ tab: newTab, data: data });
        }
        return new AXTabPageResult(newTab, (closing, closed) => {

            newTab.closed = (e) => {
                if (closed) closed(e);
            }
            newTab.closing = (e) => {
                if (closing) closing(e);
                e.resolve();
            }

            this.tabs.push(newTab);
            this.tabs.filter(c => c.id != newTab.id).forEach(t => {
                t.active = false;
            });
            this.opened.emit(newTab);
        });
    }

    close(tab: AXTabPage, e: ClosingEventArgs) {
        if (tab.content.onClosing) {
            e = Object.assign({ cancel: false }, e);
            let z: ClosingAction = {
                cancel: e.cancel,
                data: e.data,
                resolve: () => {
                    if (tab.closing) {
                        let d: ClosingAction = {
                            cancel: e.cancel,
                            data: e.data,
                            resolve: () => {
                                if (e.cancel != true)
                                    this.doCloseAction(tab, e);
                            }
                        };
                        e.cancel = z.cancel;
                        e.data = z.data;
                        tab.closing(d);
                    }
                    else {
                        if (e == null || e.cancel != true) {
                            this.doCloseAction(tab, e)
                        }
                    }
                }
            }
            tab.content.onClosing(z);
        }
        else {
            this.doCloseAction(tab, e);
        }
    }

    private doCloseAction(tab: AXTabPage, e: ClosingEventArgs): void {

        this.tabs = this.tabs.filter(c => c.id != tab.id);
        let prev = this.tabs.filter(c => c.id < tab.id).reverse()[0];
        this.active(prev);
        this.closed.emit(tab);
        if (tab.closed) tab.closed(e);
    }

    active(tab: AXTabPage) {
        if (tab) {
            tab.active = true;
            this.tabs.filter(c => c.id != tab.id).forEach(t => {
                t.active = false;
            });
            this.opened.emit(tab);
        }
        else {
            return this.tabs.find(c => c.active == true);
        }
    }





    sendMessage(message: AXTabPageMessage) {
        this.received.emit(message);
    }

}