import { AXValidatableComponent } from "../../../core/base.class";
import { Input, Injector, Inject, ViewChild } from "@angular/core";
import { IValidationRuleResult } from "../validation/validation.classs";
import moment from 'jalali-moment'
import { AXDateTime } from "../../../core/calendar/datetime";
import { AXDropDownComponent } from "../drop-down/drop-down.component";
export interface AXIDatePicker{
    validate(): Promise<IValidationRuleResult>;
    selectToday():void;
    clear(): void
    label: string;
    placeholder: string;
    showClear: boolean;
}

export abstract class AXDatePicker extends AXValidatableComponent implements AXIDatePicker{


    @ViewChild("dropdown")
    dropdown:AXDropDownComponent;
    @Input() placeholder: string = "";
    @Input() showClear: boolean = false;

    date: { year: number; month: number };
    @Input() label: string = "Date";

    model:any=null;
    _text:string=""
    constructor(injector:Injector ) {
        super();
    }

    selectToday() {
    }

    clear(): void {
    }

    ngAfterViewInit(): void {
        this.selectToday();
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
    onDateChange(date:AXDateTime){
        this.dropdown.close();
        this._text = date.format("MM/DD/YY")
    }
}