import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  ViewEncapsulation
} from "@angular/core";
import {
  AXTextInputBaseComponent,
  IValidationWidget
} from "../../core/base.class";
@Component({
  selector: "ax-text-box",
  templateUrl: "./text-box.component.html",
  styleUrls: ["./text-box.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class AXTextBoxComponent extends AXTextInputBaseComponent
  implements IValidationWidget {
  @ViewChild("input") input: ElementRef;

  _isFocused: boolean = false;
  _isError: boolean = false;
  _showError: boolean = false;

  @Input()
  label: string;

  @Input() mask: any;
  get maskInner() {
    return this.mask ? this.mask : false;
  }

  @Input() errorText: string = "";

  validate(): boolean {
    if (this.text == "" || this.text == null) {
      this._isError = true;

      return false;
    } else {
      this._isError = false;
      this._isFocused = true;
    }
    return true;
  }

  onBlur(e) {
    if (this.text != "") {
      this._isFocused = true;
    }
    this._isFocused = false;
    this.validate();
  }

  onFocus(e) {
    this._isFocused = true;
    this.input.nativeElement.focus();
  }

  onMouseEnter() {
    if (this._isError) this._showError = !this._showError;
  }

  onMouseLeave() {
    if (this._isError) this._showError = !this._showError;
  }
  onChange(e) {
    console.log(e);
    this.text = e;
    this._isFocused = true;
  }
  @Input()
  get showErorr(): boolean {
    return this._showError;
  }
  set showErorr(val: boolean) {
    this._showError = val;
  }
}
