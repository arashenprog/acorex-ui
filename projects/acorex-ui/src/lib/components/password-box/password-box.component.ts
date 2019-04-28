import { Component, Input } from "@angular/core";
import { AXTextInputBaseComponent } from "../../core/base.class";

@Component({
  selector: "ax-pass-box",
  templateUrl: "./password-box.component.html"
})
export class AXPasswordBoxComponent extends AXTextInputBaseComponent {
  private _showOn: string;
  @Input()
  get showOn(): string {
    return this._showOn;
  }
  set showOn(val: string) {
    this._showOn = val;
  }

  typInput: string = "password";
  hiddenMouse: boolean = false;
  hiddenClick: boolean = false;

  onClickInner() {
    if (this._showOn == "Click") {
      if (this.typInput == "password") this.typInput = "text";
      else this.typInput = "password";
    }
  }

  mouseDown() {
    if (this._showOn == "Mouseup") {
      this.typInput = "text";
    }
  }

  mouseUp() {
    if (this._showOn == "Mouseup") {
      this.typInput = "password";
    }
  }
}
