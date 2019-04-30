import { Component, Input } from "@angular/core";
import { AXTextInputBaseComponent, AXValidatableComponent } from "../../core/base.class";

@Component({
  selector: "ax-pass-box",
  templateUrl: "./password-box.component.html",
  providers: [{ provide: AXValidatableComponent, useExisting: AXPasswordBoxComponent }]
})
export class AXPasswordBoxComponent extends AXTextInputBaseComponent {

  private _showOn: string = "mouseup";
  @Input()
  get showOn(): string {
    return this._showOn;
  }
  set showOn(val: string) {
    this._showOn = val;
  }
  typeInput: string = "password";
  hiddenMouse: boolean = false;
  hiddenClick: boolean = false;

  onClickInner() {
    if (this._showOn == "click") {
      if (this.typeInput == "password") {
        this.typeInput = "text";
      } else {
        this.typeInput = "password";
      }
    }
  }

  mouseDown() {
    if (this._showOn == "mouseup") {
      this.typeInput = "text";
    }
  }

  mouseUp() {
    if (this._showOn == "mouseup") {
      this.typeInput = "password";
    }
  }
}
