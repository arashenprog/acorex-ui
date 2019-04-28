import { Input, Output, EventEmitter } from "@angular/core";
import { ButtonItem } from "./menu.class";

export interface IValidationWidget {
  validate(): boolean;
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
}

export class AXButtonBaseComponent extends AXTextBaseComponent {
  @Output() onClick: EventEmitter<string> = new EventEmitter<string>();
}

export class AXTextInputBaseComponent extends AXTextBaseComponent {
  @Input() autocomplete: boolean = false;
  @Input() placeholder: string = "Placeholder";
}
export class AXSelectBaseComponent extends AXTextInputBaseComponent {
  @Input() notFoundText: string = "Not Found";
}

export class AXCheckedBaseComponent extends AXTextInputBaseComponent {
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

export class AXDatePickerBaseComponent extends AXTextInputBaseComponent {}

export class AXLoadingBaseComponent extends AXTextBaseComponent {}

export class AXCardBaseComponent extends AXBaseComponent {
  @Input() title: string = "Title";
  @Input() content: string = "Content";
  @Input() buttons: Array<ButtonItem> = [];
  @Input() image: string = "";
}
