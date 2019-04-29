import { Input, Output, EventEmitter, ContentChild } from "@angular/core";
import { ButtonItem } from "./menu.class";
import { AXValidations } from '../components/validation/validation.component';
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
  @Input()
  width: string = "";
  @Input() height: string = "auto";
  @Input() rtlEnabled: boolean = true;

  focus(): void {}

  isFocused(): boolean {
    return false;
  }
}

export class AXTextBaseComponent extends AXBaseComponent {
  @Input() text: string;
  @Input() label: string;
}

export class AXButtonBaseComponent extends AXTextBaseComponent {
  @Output() onClick: EventEmitter<string> = new EventEmitter<string>();
}

export abstract class AXValidatableComponent extends AXTextBaseComponent {
  abstract validate(): Promise<IValidationRuleResult>;
  _isError: boolean = false;
  _showError: boolean = false;
  @ContentChild(AXValidations) validation: AXValidations;
}

export abstract class AXTextInputBaseComponent extends AXValidatableComponent {
  @Input() autocomplete: boolean = false;
  @Input() placeholder: string = "";
 
}
export abstract class AXSelectBaseComponent extends AXTextInputBaseComponent {
  @Input() notFoundText: string = "Not Found";
}

export abstract class AXCheckedBaseComponent extends AXTextInputBaseComponent {
  _uid: string = "M" + Math.ceil(Math.random() * 10000);

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

export abstract class AXDatePickerBaseComponent extends AXTextInputBaseComponent {}

export class AXLoadingBaseComponent extends AXTextBaseComponent {}

export class AXCardBaseComponent extends AXBaseComponent {
  @Input() title: string = "Title";
  @Input() content: string = "Content";
  @Input() buttons: Array<ButtonItem> = [];
  @Input() image: string = "";
}
