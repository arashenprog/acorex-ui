import { Injectable, ComponentRef } from "@angular/core";
import { InjectionService } from "../../../core/injection.service";
import { AXPopupComponent } from "./popup.component";
import { ClosingAction, ClosedEventArgs, ClosingEventArgs } from "./popup.events";

export class AXPopupResult {
  private _executor: (
    closing: (e?: ClosingAction) => void,
    closed: (e?: ClosingEventArgs) => void
  ) => void;
  constructor(
    private popup: AXPopupComponent,
    executor: (
      closing: (e?: ClosingAction) => void,
      closed: (e?: ClosingEventArgs) => void
    ) => void
  ) {
    this._executor = executor;
    setTimeout(() => {
      this._executor(this.closingAction, this.closedAction);
    }, 50);
  }

  private closingAction: (e?: ClosingAction) => void;
  private closedAction: (e?: ClosedEventArgs) => void;

  closed(action: (e?: ClosedEventArgs) => void): AXPopupResult {
    this.closedAction = action;
    return this;
  }
  closing(action: (e?: ClosingAction) => void): AXPopupResult {
    this.closingAction = action;
    return this;
  }

  dismiss() {
    this.popup.close.emit({});
  }
}

@Injectable({ providedIn: "root" })
export class AXPopupService {
  private stack: Array<AXPopupComponent> = [];

  constructor(private injection: InjectionService) { }

  open(content: any, title: string): AXPopupResult;
  open(
    content: any,
    options?: {
      title: string;
      closable?: boolean;
      maximizable?: boolean;
      size?: "sm" | "md" | "lg" | "full";
      data?: any;
    }
  ): AXPopupResult;

  open(arg1, arg2): AXPopupResult {
    const options: any = { closable: true, size: "md", maximizable: false };
    if (typeof arg2 == "string") {
      options.title = arg2;
    } else {
      Object.assign(options, arg2);
    }
    const com = this.injection.appendComponent(AXPopupComponent, options);
    const popup = com.instance as AXPopupComponent;
    popup.content = arg1;
    this.stack.forEach(p => {
      p.deactive();
    });
    this.stack.push(popup);
    popup.active();
    switch (options.size) {
      case "sm":
        popup.width = 30;
        break;
      case "md":
        popup.width = 50;
        break;
      case "lg":
        popup.width = 80;
        break;
      default:
        popup.width = 100;
        break;
    }
    return new AXPopupResult(popup, (closing, closed) => {
      popup.close.subscribe((e: ClosingEventArgs) => {
        if (popup.content.onClosing) {
          e = Object.assign({ cancel: false }, e);
          let z: ClosingAction = {
            cancel: e.cancel,
            data: e.data,
            resolve: () => {
              if (closing) {
                let d: ClosingAction = {
                  cancel: e.cancel,
                  data: e.data,
                  resolve: () => {
                    if (e.cancel != true) {
                      this.closePopup(closed, e, com);
                    }
                  }
                };
                e.cancel = z.cancel;
                e.data = z.data;
                closing(d);
              } else {
                if (e == null || e.cancel != true) {
                  this.closePopup(closed, {
                    data: z.data
                  }, com);
                }
              }
            }
          };
          popup.content.onClosing(z);
        } else {
          this.closePopup(closed, e, com);
        }
      });
    });
  }

  private closePopup(
    closed: (e?: ClosingEventArgs) => void,
    e: ClosingEventArgs,
    com: ComponentRef<any>
  ) {
    if (closed) closed(e);
    com.destroy();
    this.stack.pop();
    if (this.stack.length) this.stack.reverse()[0].focus();
  }
}
