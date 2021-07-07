import { Component, Input, ElementRef, HostListener, ChangeDetectorRef, ChangeDetectionStrategy, AfterViewInit, OnInit, EventEmitter, Output, ContentChild, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AXValidatableComponent } from '../../../core/base.class';

@Component({
  selector: 'ax-number-box',
  templateUrl: './number-box.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents;' },
  providers: [{ provide: AXValidatableComponent, useExisting: AXNumberBoxComponent }]
})
export class AXNumberBoxComponent implements OnInit {

  @ViewChild('input')
  input: ElementRef<HTMLInputElement>;
  protected _isFocused: boolean = false;
  @Input() min: number = null;
  @Input() max: number = null;
  @Input() label: string;
  @Input()
  showSeparator: boolean = false;
  @Input()
  showCurrency: boolean = false;
  @Input()
  disabled: boolean = false;

  @Output()
  valueChange: EventEmitter<any> = new EventEmitter<any>();

  errorText: ""
  @Output()
  public onBlur: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  icon: string = '';
  @Input()
  allowClear: boolean = true;

  @Output()
  onValueChanged: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  textAlign: 'right' | 'left' | null = null;

  @Input()
  placeholder: string;

  userQuestionUpdate = new Subject<string>();

  tmp: any;
  count: number;
  findDots: boolean = false;
  findMinus: boolean = false;
  cursorPosition: number = 0;
  dotPosition: number;
  textValue: string;
  decimalConstant: number = 0.1;
  lastStep: number = null;
  @Input()
  readonly: boolean = false;
  @Input() intStep: number = 1;
  @Input() decimalNumber: number = null;
  @Input() customStep: number = null;

  private _value: string;
  @Input()
  public get value(): string {
    return this._value;
  }
  public set value(v: string) {
    if (v === '-') {
      this.textValue = '-';
      this._value = '-';
    } else {
      if (v === '' || v == null || v === undefined ? true : isNaN(Number(v.toString().replace(/,/g, ''))) === false) {
        if (v === '' || v == null || v === undefined) {
          this.textValue = '';
          const old = this._value;
          this._value = null;

          if (this._value !== old) {
            this.valueChange.emit(null);
            this.onValueChanged.emit({

              value: null

            });
            this.cdr.detectChanges();
            //  this.clearValidationStyle(this.input.nativeElement);
          }
        } else {
          v = v.toString();

          // this.addCommas(v.toString());
          this.textValue = this.showSeparator && v ? this.addCommas(v.toString()) : v;

          // if (this.textValue.indexOf('.') !== -1) {
          //   // const dottt= (this.textValue.length-1) - this.textValue.indexOf('.')
          //   if (this.textValue.length - 1 - this.textValue.indexOf('.') < this.decimalNumber) {
          //     const a = this.decimalNumber - (this.textValue.length - 1 - this.textValue.indexOf('.'));
          //     const z = '0';
          //     this.textValue = this.textValue + '0';
          //   }
          // }

          if (this._value) {
            const old = this._value;
            if (old.toString().search(/\./g) !== v.toString().search(/\./g)) {
              if (this.cursorPosition <= old.search(/\./g)) {
                this.cursorPosition = v.search(/\./g);
              } else {
                this.cursorPosition = v.length;
              }
            }
          }
          if (v !== this._value) {
            const old = this._value;
            this._value = v;
            this.valueChange.emit(this.showSeparator && v ? Number(v.replace(/,/g, '')) : Number(v));
            this.onValueChanged.emit({

              value: this.showSeparator && v ? Number(v.replace(/,/g, '')) : Number(v),

            });
            this.cdr.detectChanges();
            //  this.clearValidationStyle(this.input.nativeElement);
          }
        }
      } else {
        this.textValue = '';
        v = null;
        const old = this._value;
        this._value = null;

        if (this._value !== old) {
          this.valueChange.emit(null);
          this.onValueChanged.emit({
            component: this,
            value: null,
            oldValue:
              this.showSeparator && old
                ? old === '-'
                  ? null
                  : Number(old.replace(/,/g, ''))
                : old === null || old === undefined
                  ? null
                  : old === '-'
                    ? null
                    : Number(old),
            htmlElement: this.ref.nativeElement
          });
          this.cdr.detectChanges();
          // this.clearValidationStyle(this.input.nativeElement);
        }
      }
    }
  }
  constructor(protected cdr: ChangeDetectorRef, protected ref: ElementRef) {

    this.textAlign = 'left';
  }
  clear() {
    this.value = null;
    this.input.nativeElement.value = null;
  }

  handleFocusEvent(e: UIEvent) {
    this._isFocused = true;
  }
  get isFocused(): boolean {
    return this._isFocused;
  }
  setTextAlign() {
    if (this.textAlign === 'left') {
      return 'text-left';
    }
    if (this.textAlign === 'right') {
      return 'text-right';
    }
  }

  handleInputBlur(e: Event) {
    this.onBlur.emit({
      component: this,
      htmlElement: this.ref.nativeElement,
      htmlEvent: e
    });
  }

  addCommas(nStr) {
    nStr += '';
    const x = nStr.split('.');
    let x1 = x[0];
    const x2 = x.length > 1 ? '.' + x[1] : '';
    const rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
  }

  ngOnInit() {
    this.checkMinMax(this.value);
    if (this.disabled === false) {
      setTimeout(() => {
        this.input.nativeElement.addEventListener('wheel', (e) => {
          this.handleWheel(e);
        });
      }, 500);
    }

    // this.value = this.min.toString();
  }

  handleWheel(event) {
    if ((event as any).wheelDelta > 0) {
      // this.input.nativeElement.style.caretColor = 'transparent';

      this.upStepHandel();
      this.delaySearch();

      setTimeout(() => {
        this.setCaret();
        //  this.input.nativeElement.style.caretColor = 'auto';
      }, 0);
    }
    if ((event as any).wheelDelta < 0) {
      // this.input.nativeElement.style.caretColor = 'transparent';

      this.downStepHandel();
      this.delaySearch();

      setTimeout(() => {
        this.setCaret();
        //    this.input.nativeElement.style.caretColor = 'auto';
      }, 0);
    }
    event.stopPropagation();
    event.preventDefault();
  }

  handleKeyPress(event: any) {
    const NumberDotpattern = /[0-9\.]/g;
    const NumberMinusPattern = /[0-9\-]/g;
    const inputChar = String.fromCharCode(event.charCode);
    if (this.value && this.value.toString().match(/\./g) === null) {
      this.findDots = false;
    }
    if (this.value && this.value.toString().search('-') === null) {
      this.findMinus = false;
    }

    // get cursur position when key press
    if (this.input.nativeElement.selectionStart || this.input.nativeElement.selectionStart === 0) {
      this.cursorPosition = this.input.nativeElement.selectionStart;
      this.cursorPosition += 1;
    }

    // control cursor when in first Index
    if (this.cursorPosition <= 1) {
      if (!NumberMinusPattern.test(inputChar)) {
        event.preventDefault();
      }
      if (this.value && this.value.match(/\-/g)) {
        event.preventDefault();
      }
    }
    // control cursor when in another index
    if (this.cursorPosition !== 1) {
      if (event.keyCode !== 8 && !NumberDotpattern.test(inputChar)) {
        event.preventDefault();
      } else {
        // for contor decimal figur = 0 or null
        if (this.decimalNumber === null || this.decimalNumber === 0) {
          if (inputChar === '.') {
            event.preventDefault();
          }
        }
        // control decimal number (figur of decimal)
        if (this.value && this.value.toString().match(/\./g)) {
          const figureAfterDot = this.value.length - this.value.indexOf('.');
          const dotIndex = this.value.indexOf('.');
          if (dotIndex - 1 + dotIndex + figureAfterDot > dotIndex - 1 + dotIndex + this.decimalNumber && this.cursorPosition - 1 > dotIndex) {
            event.preventDefault();
          }
        }
        // control '.' input
        if (inputChar === '.') {
          const lastChar = this.value.toString().charAt(this.value.length - 1);
          // control . when last char is -
          if (lastChar.toString().match(/\-/g)) {
            event.preventDefault();
          }
          // control . when find first dot
          if (this.findDots) {
            event.preventDefault();
          }
          this.findDots = true;
          this.findMinus = true;
        }
      }
    }
  }

  handleKeyUp(event: KeyboardEvent) {

    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      // this.input.nativeElement.style.caretColor = 'auto';
      event.preventDefault();
      event.stopPropagation();
    }

    if (event.key === 'ArrowUp') {
      this.setCaret();
    }

    if (event.key === 'ArrowDown') {
      this.setCaret();
    }

    // left & right Button
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      if (this.input.nativeElement.selectionStart || this.input.nativeElement.selectionStart === 0) {
        this.cursorPosition = this.input.nativeElement.selectionStart;
      }
    }

    // home button
    if (event.key === 'Home') {
      this.cursorPosition = 0;
    }

    // end button
    if (event.key === 'End') {
      this.cursorPosition = this.value.length;
    }

    // set delay with rxjs
    this.delaySearch();

    // backspace Control
    if (event.key === 'Backspace') {
      if (this.value === null || this.value.length <= 0) {
        this.cursorPosition = 0;
      } else {
        this.cursorPosition -= 1;
      }
    }
  }

  handleKeyDown(event: KeyboardEvent) {

    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault();
      event.stopPropagation();
    }
    if (this.readonly === false) {
      const countAfterDot =
        this.value !== null && this.value !== '' && this.value !== undefined
          ? this.value.toString().length - 1 - this.value.toString().indexOf('.')
          : 0;
      const defaultStep: number =
        countAfterDot > this.decimalNumber ? Math.pow(this.decimalConstant, this.decimalNumber) : Math.pow(this.decimalConstant, countAfterDot);
      // step and +- with up key and down key
      if (this.value && this.value.toString().match(/\./g)) {
        this.dotPosition = this.value.indexOf('.');
        if (this.dotPosition >= this.cursorPosition) {
          if (event.key === 'ArrowDown') {
            this.tmp = parseFloat(this.value.replace(/,/g, ''));
            this.count = this.tmp - +this.intStep;
            if (this.min === null || Number(this.count) >= Number(this.min)) {
              // this.value = this.count.toFixed(this.decimalNumber);
              this.value = this.count.toFixed(countAfterDot > this.decimalNumber ? this.decimalNumber : countAfterDot);
            }
          }

          if (event.key === 'ArrowUp') {
            this.tmp = parseFloat(this.value.replace(/,/g, ''));
            this.count = this.tmp + +this.intStep;
            if (this.max === null || Number(this.count) <= Number(this.max)) {
              this.value = this.count.toFixed(countAfterDot > this.decimalNumber ? this.decimalNumber : countAfterDot);
            }
          }
        } else {
          if (event.key === 'ArrowDown') {
            if (this.min === null || Number(this.value) > Number(this.min)) {
              if (this.customStep !== null) {
                this.tmp = parseFloat(this.value.replace(/,/g, ''));
                this.lastStep =
                  parseFloat(defaultStep.toFixed(countAfterDot > this.decimalNumber ? this.decimalNumber : countAfterDot)) +
                  parseFloat(this.customStep.toFixed(countAfterDot > this.decimalNumber ? this.decimalNumber : countAfterDot)) -
                  parseFloat(defaultStep.toFixed(countAfterDot > this.decimalNumber ? this.decimalNumber : countAfterDot));
                this.count = parseFloat(this.tmp) - this.lastStep;
                this.value = this.count.toFixed(countAfterDot > this.decimalNumber ? this.decimalNumber : countAfterDot);
              } else {
                this.tmp = parseFloat(this.value.replace(/,/g, ''));
                this.count = parseFloat(this.tmp) - defaultStep;
                this.value = this.count.toFixed(countAfterDot > this.decimalNumber ? this.decimalNumber : countAfterDot);
              }
            }
          }

          if (event.key === 'ArrowUp') {
            if (this.max === null || Number(this.value) < Number(this.max)) {
              if (this.customStep !== null) {
                this.tmp = parseFloat(this.value.replace(/,/g, ''));
                this.lastStep =
                  parseFloat(defaultStep.toFixed(countAfterDot > this.decimalNumber ? this.decimalNumber : countAfterDot)) +
                  parseFloat(this.customStep.toFixed(countAfterDot > this.decimalNumber ? this.decimalNumber : countAfterDot)) -
                  parseFloat(defaultStep.toFixed(countAfterDot > this.decimalNumber ? this.decimalNumber : countAfterDot));
                this.count = parseFloat(this.tmp) + this.lastStep;
                this.value = this.count.toFixed(countAfterDot > this.decimalNumber ? this.decimalNumber : countAfterDot);
              } else {
                this.tmp = parseFloat(this.value.replace(/,/g, ''));
                this.count = parseFloat(this.tmp) + defaultStep;
                this.value = this.count.toFixed(countAfterDot > this.decimalNumber ? this.decimalNumber : countAfterDot);
              }
            }
          }
        }
      } else {
        if (event.key === 'ArrowDown') {
          if (this.min != null && this.value == null) {
            this.value = this.min.toString();
          } else {
            if (this.min === null || Number(this.value) > parseInt(this.min.toString())) {
              if (this.value == null) {
                this.value = '0';
              } else {
                this.tmp = +this.value.toString().replace(/,/g, '');
                this.count = +this.tmp - +this.intStep;
                this.value = this.count.toString().replace(/,/g, '');
              }
            }
          }
        }
        if (event.key === 'ArrowUp') {
          if (this.min != null && this.value == null) {
            this.value = this.min.toString();
          } else {
            if (this.max === null || Number(this.value) < parseInt(this.max.toString())) {
              if (this.value == null) {
                this.value = '0';
              } else {
                this.tmp = this.value.toString().replace(/,/g, '');
                this.count = +this.tmp + +this.intStep;
                this.value = this.count.toString().replace(/,/g, '');
              }
            }
          }
        }
      }
    }

    // stop when keydown
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      //  this.input.nativeElement.style.caretColor = 'transparent';
      event.preventDefault();
      event.stopPropagation();
      return false;
    }
  }

  handleClick() {
    if (this.input.nativeElement.selectionStart || this.input.nativeElement.selectionStart === 0) {
      this.cursorPosition = this.input.nativeElement.selectionStart;
    }
  }

  delaySearch() {
    Observable.create((observer) => {
      this.userQuestionUpdate = observer;
    });
    this.userQuestionUpdate.pipe(debounceTime(1000), distinctUntilChanged()).subscribe((text: string) => this.checkMinMax(text));
    // this.userQuestionUpdate.next((e.target as any).value);
    setTimeout(() => {
      this.userQuestionUpdate.next(this.input.nativeElement.value);
    }, 50);
  }

  checkMinMax(text) {
    if (this.min !== null) {
      if (+text < this.min) {
        this.value = '';
      }
    }
    if (this.max !== null) {
      if (+text > this.max) {
        this.value = '';
      }
    }
  }

  doGetCaretPosition(ctrl) {
    let CaretPos = 0;
    if (ctrl.selectionStart || ctrl.selectionStart === 0) {
      CaretPos = ctrl.selectionStart;
      return CaretPos;
    }
  }

  setCaretPosition(ctrl, pos) {
    if (ctrl.setSelectionRange) {
      ctrl.focus();
      ctrl.setSelectionRange(pos, pos);
    } else if (ctrl.createTextRange) {
      const range = ctrl.createTextRange();
      range.collapse(true);
      range.moveEnd('character', pos);
      range.moveStart('character', pos);
      range.select();
    }
  }

  setCaret() {
    this.setCaretPosition(this.input.nativeElement, this.cursorPosition);
  }

  upStepHandel() {
    if (this.min != null && this.value == null) {
      this.value = this.min.toString();
    } else {
      if (this.readonly === false) {
        const countAfterDot =
          this.value !== null && this.value !== '' && this.value !== undefined
            ? this.value.toString().length - 1 - this.value.toString().indexOf('.')
            : 0;
        if (this.value == null) {
          this.value = '0';
        } else {
          const defaultStep: number =
            countAfterDot > this.decimalNumber ? Math.pow(this.decimalConstant, this.decimalNumber) : Math.pow(this.decimalConstant, countAfterDot);
          this.dotPosition = this.value.toString().indexOf('.') + 1;
          if (this.value && this.value.toString().match(/\./g)) {
            if (this.dotPosition > this.cursorPosition) {
              this.tmp = parseFloat(this.value.replace(/,/g, ''));
              this.count = this.tmp + +this.intStep;
              if (this.max === null || Number(this.count) <= this.max) {
                this.value = this.count.toFixed(countAfterDot > this.decimalNumber ? this.decimalNumber : countAfterDot);
              }
            } else {
              if (this.max === null || Number(this.value) < Number(this.max)) {
                if (this.customStep !== null) {
                  this.tmp = parseFloat(this.value.replace(/,/g, ''));
                  this.lastStep =
                    parseFloat(defaultStep.toFixed(countAfterDot > this.decimalNumber ? this.decimalNumber : countAfterDot)) +
                    parseFloat(this.customStep.toFixed(countAfterDot > this.decimalNumber ? this.decimalNumber : countAfterDot)) -
                    parseFloat(defaultStep.toFixed(countAfterDot > this.decimalNumber ? this.decimalNumber : countAfterDot));
                  this.count = parseFloat(this.tmp) + this.lastStep;
                  this.value = this.count.toFixed(countAfterDot > this.decimalNumber ? this.decimalNumber : countAfterDot).replace(/,/g, '');
                } else {
                  this.tmp = parseFloat(this.value.replace(/,/g, ''));
                  this.count = parseFloat(this.tmp) + defaultStep;
                  this.value = this.count.toFixed(countAfterDot > this.decimalNumber ? this.decimalNumber : countAfterDot).replace(/,/g, '');
                }
              }
            }
          } else {
            if (this.max === null || Number(this.value) < parseInt(this.max.toString())) {
              this.tmp = this.value.toString().replace(/,/g, '');
              this.count = +this.tmp + +this.intStep;

              this.value = this.count.toString().replace(/,/g, '');
            }
          }
        }
      }
    }
  }

  downStepHandel() {
    if (this.min != null && this.value == null) {
      this.value = this.min.toString();
    } else {
      if (this.readonly === false) {
        const countAfterDot =
          this.value !== null && this.value !== '' && this.value !== undefined
            ? this.value.toString().length - 1 - this.value.toString().indexOf('.')
            : 0;
        if (this.value == null) {
          this.value = '0';
        } else {
          const defaultStep: number =
            countAfterDot > this.decimalNumber ? Math.pow(this.decimalConstant, this.decimalNumber) : Math.pow(this.decimalConstant, countAfterDot);
          this.dotPosition = this.value.toString().indexOf('.') + 1;
          if (this.value && this.value.toString().match(/\./g)) {
            if (this.dotPosition > this.cursorPosition) {
              this.tmp = parseFloat(this.value.replace(/,/g, ''));
              this.count = parseFloat(this.value.replace(/,/g, '')) - +this.intStep;
              if (this.min === null || Number(this.count) >= this.min) {
                this.value = this.count.toFixed(countAfterDot > this.decimalNumber ? this.decimalNumber : countAfterDot).replace(/,/g, '');
              }
            } else {
              if (this.min === null || Number(this.value) > Number(this.min)) {
                if (this.customStep !== null) {
                  this.tmp = parseFloat(this.value.replace(/,/g, ''));
                  this.lastStep =
                    parseFloat(defaultStep.toFixed(countAfterDot > this.decimalNumber ? this.decimalNumber : countAfterDot)) +
                    parseFloat(this.customStep.toFixed(countAfterDot > this.decimalNumber ? this.decimalNumber : countAfterDot)) -
                    parseFloat(defaultStep.toFixed(countAfterDot > this.decimalNumber ? this.decimalNumber : countAfterDot));
                  this.count = parseFloat(this.tmp) - this.lastStep;
                  this.value = this.count.toFixed(countAfterDot > this.decimalNumber ? this.decimalNumber : countAfterDot);
                } else {
                  this.tmp = parseFloat(this.value.replace(/,/g, ''));
                  this.count = parseFloat(this.tmp) - defaultStep;
                  this.value = this.count.toFixed(countAfterDot > this.decimalNumber ? this.decimalNumber : countAfterDot);
                }
              }
            }
          } else {
            if (this.min === null || Number(this.value) > parseInt(this.min.toString())) {
              this.tmp = +this.value.toString().replace(/,/g, '');
              this.count = +this.tmp - +this.intStep;
              this.value = this.count.toString().replace(/,/g, '');
            }
          }
        }
      }
    }
  }
}
