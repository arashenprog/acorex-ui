import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { AXDropDownComponent } from '../drop-down/drop-down.component';
import { AXValidatableComponent } from '../../../core/base.class';
import { IValidationRuleResult } from '../validation/validation.classs';

@Component({
    selector: 'ax-color-picker',
    templateUrl: './color-picker.component.html',
    providers: [
        { provide: AXValidatableComponent, useExisting: AXColorPickerComponent },
    ]
})
export class AXColorPickerComponent extends AXValidatableComponent {
   
    @ViewChild("dropdown")
    dropdown: AXDropDownComponent;
    @Input() placeholder: string = "";
    @Input() showClear: boolean = false;

    @Input() label: string;

    model: any = null;
    _text: string = ""
    constructor() {
        super();
    }

    
    clear(): void {
    }

    focus():void{
        this.dropdown.focus();
    }

    ngAfterViewInit(): void {
        //this.selectToday();
    }

    @Output()
    valueChange: EventEmitter<string> = new EventEmitter<string>();

    private _value: string;
    @Input()
    public get value(): string {
        return this._value;
    }
    public set value(v: string) {
        if (v!=this._value) {
            this._value = v;
            this.valueChange.emit(v);
            this._text = v;
        }
    }


    validate(): Promise<IValidationRuleResult> {

        return new Promise<IValidationRuleResult>(resolve => {
            if (!this.validator) {
                resolve({ result: true });
            } else {
                // this.validator.validate(this.model).then(r => {
                //     r.target = this;
                //     if (r.result) {
                //         this.errorText = null;
                //     } else {
                //         this.errorText = r.message;
                //     }
                //     resolve(r);
                // });

                resolve()
            }
        });
    }
    
}
