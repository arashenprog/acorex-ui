import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  ViewEncapsulation,
  ContentChild
} from "@angular/core";
import { AXTextInputBaseComponent } from "../../core/base.class";
import { AXValidations } from "../validation/validations.widget";
import { IValidationResult } from "../validation/validation.classs";
@Component({
  selector: "ax-text-box",
  templateUrl: "./text-box.component.html",
  styleUrls: ["./text-box.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class AXTextBoxComponent extends AXTextInputBaseComponent {
  @ViewChild("input") input: ElementRef;
  @ContentChild(AXValidations) validation: AXValidations;

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

  validate(): Promise<IValidationResult> {
    // if (this.text == "" || this.text == null) {
    //   this._isError = true;

    //   return false;
    // } else {
    //   this._isError = false;
    //   this._isFocused = true;
    // }
    // return true;

    return new Promise<IValidationResult>(resolve => {
      if (!this.validation) {
        resolve({ result: true });
      } else {
        this.validation.validate(this.text).then(r => {
          if (r.result) {
            this._isError = false;
            this._isFocused = true;
          } else {
            this.errorText = r.message;
            this._isError = true;
          }
          resolve(r);
        });
      }
    });
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
  onTextClearClick() {
    this.text = "";
  }
  @Input()
  get showErorr(): boolean {
    return this._showError;
  }
  set showErorr(val: boolean) {
    this._showError = val;
  }
}
