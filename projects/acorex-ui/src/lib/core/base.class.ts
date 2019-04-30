import { Input, Output, EventEmitter, ContentChild, ViewChild, ElementRef } from "@angular/core";
import { ButtonItem } from "./menu.class";
import { AXValidationComponent } from '../components/validation/validation.component';
import { IValidationRuleResult } from '../components/validation/validation.classs';


export class PromisResult<T> {
  private _executor: (then: (e?: T) => void) => void;
  constructor(executor: (then: (e?: T) => void) => void) {
    this._executor = executor;
    setTimeout(() => {
      this._executor(this.thenAction);
    }, 50);
  }

  private thenAction: (e?: T) => void;

  then(action: (e?: T) => void): PromisResult<T> {
    this.thenAction = action;
    return this;
  }
}

export class AXBaseComponent {
  @ViewChild("input") input: ElementRef;
  _uid: string = "M" + Math.ceil(Math.random() * 10000);
  @Input()
  width: string = "";
  @Input() height: string = "auto";
  @Input() rtlEnabled: boolean = true;

  focus(): void { }

  protected _isFocused: boolean = false;

  get isFocused(): boolean {
    return this._isFocused;
  }

  onBlur(e) {
    this._isFocused = false;
  }

  onFocus(e) {
    this._isFocused = true;
    if (this.input)
      this.input.nativeElement.focus();
  }
}



export class AXButtonBaseComponent extends AXBaseComponent {
  @Input() text: string;
  @Output() onClick: EventEmitter<string> = new EventEmitter<string>();
}

export abstract class AXValidatableComponent extends AXBaseComponent {
  abstract validate(): Promise<IValidationRuleResult>;
  errorText: string = null;
  @ContentChild(AXValidationComponent)
  protected validation: AXValidationComponent;
}


export abstract class AXTextInputBaseComponent extends AXValidatableComponent {

  @Input() text: string;
  @Input() label: string;
  @Input() autocomplete: boolean = false;
  @Input() placeholder: string = "";
  @Input() showClear: boolean = false;

  clearText(): void {
    this.text = ""
  }

  onBlur(e) {
    super.onBlur(e);
    this.validate();
  }



  validate(): Promise<IValidationRuleResult> {
    return new Promise<IValidationRuleResult>(resolve => {
      if (!this.validation) {
        resolve({ result: true });
      } else {
        this.validation.validate(this.text).then(r => {
          r.target = this;
          if (r.result) {
            this.errorText = null;
          } else {
            this.errorText = r.message;
          }
          resolve(r);
        });
      }
    });
  }
}

export abstract class AXSelectBaseComponent extends AXTextInputBaseComponent {
  @Input() notFoundText: string = "Not Found";
}

export abstract class AXCheckedBaseComponent extends AXBaseComponent {

  @Input() label: string = " Checkbox label";
  @Input() value: any = null;

  // Value
  @Output()
  checkedChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  //
  _checked: boolean = null;
  //
  set checked(val: boolean) {
    this._checked = val;
    this.checkedChanged.emit(val);
  }
  //
  @Input()
  get checked() {
    return this._checked;
  }
}



export abstract class AXLoadingBaseComponent extends AXBaseComponent {

}

export abstract class AXCardBaseComponent extends AXBaseComponent {
  @Input() title: string = "Title";
  @Input() content: string = "Content";
  @Input() buttons: Array<ButtonItem> = [];
  @Input() image: string = "";
}
