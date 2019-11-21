import { Injectable } from "@angular/core";

import { AXToastWrapperComponent } from "./toast-wrapper/toast-wrapper.component";
import { AXToastMessageComponent } from "./toast-message/toast-message.component";
import { AXRenderService } from "../../../core/utils/render/render.service";

export interface IToastOptions {
  timeOut?: number;
  title?: string;
  closeable?: boolean;
}

@Injectable({providedIn:"root"})
export class AXToastService {
  constructor(private injectionService: AXRenderService) {}

  info(message: string, options?: IToastOptions) {
    this.show(message, "info", options);
  }
  success(message: string, options?: IToastOptions) {
    this.show(message, "success", options);
  }
  warning(message: string, options?: IToastOptions) {
    this.show(message, "warning", options);
  }
  error(message: string, options?: IToastOptions) {
    this.show(message, "error", options);
  }

  private show(
    message: string,
    type: "success" | "info" | "error" | "warning",
    options?: IToastOptions
  ) {
    let opt = Object.assign(
      {
        message: message,
        type: type
      },
      options
    );

    let wrapper = document.querySelector("ax-toast-wrapper");
    if (!wrapper) {
      let toastWrapper = this.injectionService.appendComponent(
        AXToastWrapperComponent
      );
      this.injectionService.appendComponent(
        AXToastMessageComponent,
        opt,
        toastWrapper.location.nativeElement
      );
    } else {
      this.injectionService.appendComponent(
        AXToastMessageComponent,
        opt,
        wrapper
      );
    }
  }
}
