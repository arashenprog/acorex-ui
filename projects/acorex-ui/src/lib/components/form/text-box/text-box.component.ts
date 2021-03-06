import { Component, Input, ViewEncapsulation } from "@angular/core";
import {
  AXTextInputBaseComponent,
  AXValidatableComponent
} from "../../../core/base.class";
@Component({
  selector: "ax-text-box",
  templateUrl: "./text-box.component.html",
  providers: [
    { provide: AXValidatableComponent, useExisting: AXTextBoxComponent }
  ]
})
export class AXTextBoxComponent extends AXTextInputBaseComponent {
  @Input() mask: any;
  get maskInner() {
    return this.mask ? this.mask : false;
  }

  @Input()
  type: "text" | "number" = "text";

  focus(): void {
    if (this.input) this.input.nativeElement.focus();
  }
}
