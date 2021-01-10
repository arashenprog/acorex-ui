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


  @Input()
  minValue: any;

  @Input()
  maxValue: any;


  protected _text: any;
  @Input()
  public get text(): any {
    return this.type == 'number' ? Number(this._text) : this._text;
  }
  public set text(v: any) {
    if (v != this._text) {
      this._text = this.type == 'number' ? Number(v) : v;
      this.textChange.emit(this._text);
      if (this.validator && this.validator.validateOn == "change")
        this.validate();
    }
  }

  focus(): void {
    if (this.input) this.input.nativeElement.focus();
  }
}
