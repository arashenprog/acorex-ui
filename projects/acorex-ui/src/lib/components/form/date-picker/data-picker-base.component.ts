import { AXValidatableComponent } from "../../../core/base.class";
import { NgbDateStruct, NgbCalendar } from "@ng-bootstrap/ng-bootstrap";
import { Input, Injector, Inject } from "@angular/core";
import { IValidationRuleResult } from "../validation/validation.classs";

export interface AXIDatePicker{
    validate(): Promise<IValidationRuleResult>;
    selectToday():void;
    clear(): void
    label: string;
    placeholder: string;
    showClear: boolean;
}

export abstract class AXDatePicker extends AXValidatableComponent implements AXIDatePicker{

    @Input() placeholder: string = "";
    @Input() showClear: boolean = false;

    model: NgbDateStruct;
    date: { year: number; month: number };
    @Input() label: string = "Date";
    private calendar: NgbCalendar

    constructor(injector:Injector ) {
        super();
        this.calendar =  injector.get(NgbCalendar);
    }

    selectToday() {
        this.model = this.calendar.getToday();
    }

    clear(): void {
        this.model = null;
    }

    ngAfterViewInit(): void {
        this.selectToday();
    }


    validate(): Promise<IValidationRuleResult> {

        return new Promise<IValidationRuleResult>(resolve => {
            if (!this.validator) {
                resolve({ result: true });
            } else {
                this.validator.validate(this.model).then(r => {
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