import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  ViewEncapsulation
} from "@angular/core";
import { AXTextInputBaseComponent, AXValidatableComponent } from "../../core/base.class";
import { IValidationRuleResult } from "../validation/validation.classs";
@Component({
  selector: "ax-text-box",
  templateUrl: "./text-box.component.html",
  styleUrls: ["./text-box.component.scss"],
  encapsulation: ViewEncapsulation.None,
  providers: [{ provide: AXValidatableComponent, useExisting: AXTextBoxComponent }]
})
export class AXTextBoxComponent extends AXTextInputBaseComponent {
  @ViewChild("input") input: ElementRef;
 

  _isFocused: boolean = false;


  @Input()
  label: string;

  @Input() mask: any;
  get maskInner() {
    return this.mask ? this.mask : false;
  }

  @Input() errorText: string = "";

  validate(): Promise<IValidationRuleResult> {
    return new Promise<IValidationRuleResult>(resolve => {
      if (!this.validation) {
        resolve({ result: true });
      } else {
        this.validation.validate(this.text).then(r => {
          r.target = this;
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
