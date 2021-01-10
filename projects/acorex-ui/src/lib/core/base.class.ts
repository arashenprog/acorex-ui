import {
  Input,
  Output,
  EventEmitter,
  ContentChild,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
  Directive
} from "@angular/core";
import { ButtonItem } from "./menu.class";
import { AXValidationComponent } from "../components/form/validation/validation.component";
import { IValidationRuleResult } from "../components/form/validation/validation.classs";
import { AXKeyboardEvent } from "./events/keyboard";

export class PromisResult<T> {
  private _executor: (then?: (e?: T) => void) => void;

  constructor(executor: (then?: (e?: T) => void) => void) {
    this._executor = executor;
    setTimeout(() => {
      this._executor(this.thenAction);
    }, 50);
  }

  private thenAction?: (e?: T) => void;

  then(action?: (e?: T) => void): PromisResult<T> {
    this.thenAction = action;
    return this;
  }

  static resolve<T>(value: T): PromisResult<T> {
    const r = new PromisResult<T>(z => {
      z(value);
    }).then(c => {});
    return r;
  }
}

export abstract class AXBaseComponent {
  _uid: string = "M" + Math.ceil(Math.random() * 100000000);
}

@Directive()
export abstract class AXEditableBaseComponent extends AXBaseComponent {
  @Input() readonly: boolean = false;
  protected _isFocused: boolean = false;
  @Input() disabled: boolean = false;

  get isFocused(): boolean {
    return this._isFocused;
  }

  handleBlurEvent(e: UIEvent) {
    this._isFocused = false;
  }

  handleFocusEvent(e: UIEvent) {
    this._isFocused = true;
  }

  abstract focus();
}

@Directive()
export class AXButtonBaseComponent extends AXBaseComponent {
  @Input() text: string;
  @Output() onClick: EventEmitter<string> = new EventEmitter<string>();
  @Input() disabled: boolean = false;
  @Input() width: string = "";
  @Input() height: string = "auto";
}

@Directive()
export abstract class AXValidatableComponent extends AXEditableBaseComponent {
  abstract validate(): Promise<IValidationRuleResult>;
  errorText: string = null;

  @ContentChild(AXValidationComponent, { static: true })
  public validator: AXValidationComponent;
}

export abstract class AXTextInputBaseComponent extends AXValidatableComponent {
  @ViewChild("input") input: ElementRef<HTMLInputElement>;
  @Output()
  textChange: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  onKey: EventEmitter<AXKeyboardEvent> = new EventEmitter<AXKeyboardEvent>();

  protected _text: any;
  @Input()
  public get text(): any {
    return this._text;
  }
  public set text(v: any) {
    if (v != this._text) {
      this._text = v;
      this.textChange.emit(v);
      if (this.validator && this.validator.validateOn == "change")
        this.validate();
    }
  }

  @Input() label: string;
  @Input() autocomplete: boolean = false;
  @Input() placeholder: string = "";
  @Input() showClear: boolean = false;

  clearText(): void {
    this.text = undefined;
  }

  handleBlurEvent(e) {
    super.handleBlurEvent(e);
    if (this.validator && this.validator.validateOn == "blur") this.validate();
  }

  handleKeyEvent(e: KeyboardEvent) {
    let ev = <AXKeyboardEvent>e;
    if (this.onKey) this.onKey.emit(ev);
  }

  focus() {
    this.input.nativeElement.focus();
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

@Directive()
export abstract class AXSelectBaseComponent extends AXTextInputBaseComponent {
  @Input() notFoundText: string = "Not Found";
}

@Directive()
export abstract class AXCheckedBaseComponent extends AXBaseComponent {
  @Input() label: string = "";
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;

  constructor(protected cdr: ChangeDetectorRef) {
    super();
  }

  // Value
  @Output()
  valueChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  //
  protected _value: boolean = false;
  //
  set value(val: boolean) {
    if (this._value !== val) {
      this._value = val;
      this.valueChange.emit(val);
      this.cdr.markForCheck();
    }
  }
  //
  @Input()
  get value(): boolean {
    return this._value;
  }
}

@Directive()
export abstract class AXLoadingBaseComponent extends AXBaseComponent {
  @Input() text: string;
  @Input() color: string = "#0062cc";
}

@Directive()
export abstract class AXCardBaseComponent extends AXBaseComponent {
  @Input() title: string = "Title";
  @Input() content: string = "Content";
  @Input() buttons: Array<ButtonItem> = [];
  @Input() image: string = "";
}
