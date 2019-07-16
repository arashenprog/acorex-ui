import { Component, Injectable, ViewEncapsulation, Injector } from "@angular/core";

import { AXValidatableComponent } from '../../../core/base.class';
import { AXDatePicker, AXIDatePicker } from "./data-picker-base.component";



@Component({
    selector: "ax-date-picker-persian",
    templateUrl: "./date-picker-base.component.html",
    encapsulation: ViewEncapsulation.None,
    styleUrls: ["./date-picker-base.component.scss"],
    providers: [
        { provide: AXValidatableComponent, useExisting: AXDatePickerPersianComponent },
        { provide: AXDatePicker, useExisting: AXDatePickerPersianComponent }
    ]
})
export class AXDatePickerPersianComponent extends AXDatePicker implements AXIDatePicker {
    constructor(injector: Injector) {
        super(injector);
    }
}
