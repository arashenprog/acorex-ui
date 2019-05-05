import { Injectable, EventEmitter } from "@angular/core";
import { ClosingEventArgs, ClosedEventArgs, ClosingAction } from "../components/popup/popup.service";

export interface IPageTab {
    title: string;
    closable: boolean;
    content: any;
    option?: any;
    id: number;
    active: boolean;
    closed?: Function;
    closing?: (x: ClosingAction) => void;
    send?: Function;
}

export interface IPageTabMessage {
    tab: IPageTab;
    data: any;
}



export class PageTabResult {
    private _executor: (closing: (e?: ClosingAction) => void, closed: (e?: ClosedEventArgs) => void) => void;
    constructor(private tab: IPageTab,
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


    closed(action: (e?: ClosedEventArgs) => void): PageTabResult {
        this.closedAction = action;
        return this;
    }
    closing(action: (e?: ClosingAction) => void): PageTabResult {
        this.closingAction = action;
        return this;
    }

    send(data: any) {
        this.tab.send(data);
    }
}

@Injectable({ providedIn: "root" })
export class PageTabService {

    tabs: IPageTab[] = new Array<IPageTab>();


    opened: EventEmitter<IPageTab> = new EventEmitter<IPageTab>();
    closed: EventEmitter<IPageTab> = new EventEmitter<IPageTab>();
    received: EventEmitter<IPageTabMessage> = new EventEmitter<IPageTabMessage>();


    constructor() {

    }

    open(content: any, title: string): PageTabResult;
    open(content: any, title: string, data?: any): PageTabResult;
    open(options: { content: any, title: string, closable?: boolean, data?: any }): PageTabResult;

    open(arg1, arg2?, arg3?) {
        let newTab: IPageTab;
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
        return new PageTabResult(newTab, (closing, closed) => {

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

    close(tab: IPageTab, e: ClosingEventArgs) {
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

    private doCloseAction(tab: IPageTab, e: ClosingEventArgs): void {

        this.tabs = this.tabs.filter(c => c.id != tab.id);
        let prev = this.tabs.filter(c => c.id < tab.id).reverse()[0];
        this.active(prev);
        this.closed.emit(tab);
        if (tab.closed) tab.closed(e);
    }

    active(tab: IPageTab) {
        tab.active = true;
        this.tabs.filter(c => c.id != tab.id).forEach(t => {
            t.active = false;
        });
        this.opened.emit(tab);
    }

    sendMessage(message: IPageTabMessage) {
        this.received.emit(message);
    }

}