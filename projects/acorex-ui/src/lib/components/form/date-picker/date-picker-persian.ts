import { Component, Injectable, ViewEncapsulation, Injector } from "@angular/core";
import {
    NgbDateStruct,
    NgbCalendar,
    NgbDatepickerI18n,
    NgbCalendarPersian
} from "@ng-bootstrap/ng-bootstrap";
import { AXValidatableComponent } from '../../../core/base.class';
import { AXDatePicker, AXIDatePicker } from "./data-picker-base.component";

const WEEKDAYS_SHORT = ["د", "س", "چ", "پ", "ج", "ش", "ی"];
const MONTHS = [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند"
];

@Injectable()
export class NgbDatepickerI18nPersian extends NgbDatepickerI18n {
    getWeekdayShortName(weekday: number) {
        return WEEKDAYS_SHORT[weekday - 1];
    }
    getMonthShortName(month: number) {
        return MONTHS[month - 1];
    }
    getMonthFullName(month: number) {
        return MONTHS[month - 1];
    }
    getDayAriaLabel(date: NgbDateStruct): string {
        return `${date.year}-${this.getMonthFullName(date.month)}-${date.day}`;
    }
}

@Component({
    selector: "ax-date-picker-persian",
    templateUrl: "./date-picker-base.component.html",
    encapsulation: ViewEncapsulation.None,
    styleUrls: ["./date-picker-base.component.scss"],
    providers: [
        { provide: AXValidatableComponent, useExisting: AXDatePickerPersianComponent },
        { provide: NgbCalendar, useClass: NgbCalendarPersian },
        { provide: NgbDatepickerI18n, useClass: NgbDatepickerI18nPersian },
        { provide: AXDatePicker, useExisting: AXDatePickerPersianComponent }
    ]
})
export class AXDatePickerPersianComponent extends AXDatePicker implements AXIDatePicker {
    constructor(injector: Injector) {
        super(injector);
    }
}
