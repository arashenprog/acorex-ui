import {
  Input,
  Output,
  EventEmitter,
  ContentChild,
  ViewChild,
  ElementRef
} from "@angular/core";
import { ButtonItem } from "./menu.class";
import { AXValidationComponent } from "../components/form/validation/validation.component";
import { IValidationRuleResult } from "../components/form/validation/validation.classs";

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

  static resolve<T>(value: T): PromisResult<T> {
    const r = new PromisResult<T>(z => {
      z(value);
    }).then(c => { });
    return r;
  }
}

export class AXBaseComponent {
  @ViewChild("input") input: ElementRef;
  _uid: string = "M" + Math.ceil(Math.random() * 10000);
  @Input()
  width: string = "";
  @Input() height: string = "auto";
  @Input() readOnly: boolean = false;

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
    if (this.input) this.input.nativeElement.focus();
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
  protected validator: AXValidationComponent;
}

export abstract class AXTextInputBaseComponent extends AXValidatableComponent {
  @Output()
  textChange: EventEmitter<string> = new EventEmitter<string>();

  private _text: string;
  @Input()
  public get text(): string {
    return this._text;
  }
  public set text(v: string) {
    if (v.trim() != this._text) {
      this._text = v;
      this.textChange.emit(v);
    }
  }

  @Input() label: string;
  @Input() autocomplete: boolean = false;
  @Input() placeholder: string = "";
  @Input() showClear: boolean = false;
  @Input() size: "xs" | "md" | "lg" = "md"
  clearText(): void {
    this.text = "";
  }

  onBlur(e) {
    super.onBlur(e);
    this.validate();
  }

  validate(): Promise<IValidationRuleResult> {
    return new Promise<IValidationRuleResult>(resolve => {
      if (!this.validator) {
        resolve({ result: true });
      } else {
        this.validator.validate(this.text).then(r => {
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
  @Input() label: string = "";

  // Value
  @Output()
  onValueChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  //
  _value: boolean = false;
  //
  set value(val: boolean) {
    if (this._value !== val) {
      this._value = val;
      this.onValueChange.emit(val);
    }
  }
  //
  @Input()
  get value() {
    return this._value;
  }
}

export abstract class AXLoadingBaseComponent extends AXBaseComponent {
  @Input() text: string;
  @Input() color: string = "#0062cc";
}

export abstract class AXCardBaseComponent extends AXBaseComponent {
  @Input() title: string = "Title";
  @Input() content: string = "Content";
  @Input() buttons: Array<ButtonItem> = [];
  @Input() image: string = "";
}
