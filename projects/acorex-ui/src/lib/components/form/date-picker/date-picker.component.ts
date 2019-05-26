import { Component, Injector } from "@angular/core";

import { AXValidatableComponent } from '../../../core/base.class';
import { AXDatePicker, AXIDatePicker } from "./data-picker-base.component";
import { ViewChild } from "@angular/core";
import { IValidationRuleResult } from "../validation/validation.classs";
import { Input } from "@angular/core";



@Component({
  selector: "ax-date-picker",
  template: `
    <div [ngSwitch]="calendar">
      <ng-container *ngSwitchCase="'persian'">
        <ax-date-picker-persian [placeholder]="placeholder" [label]="label" [showClear]="showClear"></ax-date-picker-persian>
      </ng-container>
      <ng-container *ngSwitchCase="'gregorian'">
        <ax-date-picker-gregorian [placeholder]="placeholder" [label]="label" [showClear]="showClear"></ax-date-picker-gregorian>
      </ng-container>
      <p *ngSwitchDefault>
        Invalid Calendar
      </p>
    </div>
  `,
  providers: [
    { provide: AXValidatableComponent, useExisting: AXDatePickerComponent },
  ]
})
export class AXDatePickerComponent extends AXValidatableComponent implements AXIDatePicker {

  @ViewChild(AXDatePicker) picker: AXDatePicker;

  validate(): Promise<IValidationRuleResult> {
    return this.picker.validate();
  }
  selectToday(): void {
    this.picker.selectToday();
  }
  clear(): void {
    this.picker.clear();
  }

  @Input() placeholder: string = "";
  @Input() showClear: boolean = false;
  @Input() label: string = "Date";

  @Input()
  calendar: "persian" | "gregorian" = "gregorian"

  constructor() {
    super();
  }

}
