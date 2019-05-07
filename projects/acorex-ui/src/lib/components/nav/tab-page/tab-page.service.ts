import { Injectable, EventEmitter } from "@angular/core";
import { ClosingEventArgs, ClosedEventArgs, ClosingAction } from "../popup/popup.service";

export interface ITabPage {
    title: string;
    closable: boolean;
    content: any;
    option?: any;
    id: number;
    isBusy?: false;
    active: boolean;
    closed?: Function;
    closing?: (x: ClosingAction) => void;
    send?: Function;
}

export interface ITabPageMessage {
    tab: ITabPage;
    data: any;
}



export class TabPageResult {
    private _executor: (closing: (e?: ClosingAction) => void, closed: (e?: ClosedEventArgs) => void) => void;
    constructor(private tab: ITabPage,
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


    closed(action: (e?: ClosedEventArgs) => void): TabPageResult {
        this.closedAction = action;
        return this;
    }
    closing(action: (e?: ClosingAction) => void): TabPageResult {
        this.closingAction = action;
        return this;
    }

    send(data: any) {
        this.tab.send(data);
    }
}

@Injectable({ providedIn: "root" })
export class AXTabPageService {

    tabs: ITabPage[] = new Array<ITabPage>();


    opened: EventEmitter<ITabPage> = new EventEmitter<ITabPage>();
    closed: EventEmitter<ITabPage> = new EventEmitter<ITabPage>();
    received: EventEmitter<ITabPageMessage> = new EventEmitter<ITabPageMessage>();


    constructor() {

    }

    open(content: any, title: string): TabPageResult;
    open(content: any, title: string, data?: any): TabPageResult;
    open(options: { content: any, title: string, closable?: boolean, data?: any }): TabPageResult;

    open(arg1, arg2?, arg3?) {
        let newTab: ITabPage;
        if (typeof (arg1) === 'object') {
            const options = Object.assign({ closable: true }, arg1);
            newTab = {
                id: this.tabs.length,
                title: options.title,
                closable: options.closable,
                content: options.content,
                option: options.data,
                active: true
            };
        }
        else {
            newTab = {
                id: this.tabs.length,
                title: arg2,
                closable: true,
                content: arg1,
                option: arg3,
                active: true,
            };
        }

        newTab.send = (data: any) => {
            this.sendMessage({ tab: newTab, data: data });
        }
        return new TabPageResult(newTab, (closing, closed) => {

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

    close(tab: ITabPage, e: ClosingEventArgs) {
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

    private doCloseAction(tab: ITabPage, e: ClosingEventArgs): void {

        this.tabs = this.tabs.filter(c => c.id != tab.id);
        let prev = this.tabs.filter(c => c.id < tab.id).reverse()[0];
        this.active(prev);
        this.closed.emit(tab);
        if (tab.closed) tab.closed(e);
    }

    active(tab: ITabPage) {
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

    sendMessage(message: ITabPageMessage) {
        this.received.emit(message);
    }

}