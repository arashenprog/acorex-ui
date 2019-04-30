import { Component, Injectable, ViewEncapsulation, Input } from "@angular/core";
import { AXDatePickerBaseComponent } from "../../core/base.class";
import {
  NgbDateStruct,
  NgbCalendar,
  NgbDatepickerI18n,
  NgbCalendarPersian
} from "@ng-bootstrap/ng-bootstrap";

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
  selector: "ax-date-picker",
  templateUrl: "./date-picker.component.html",
  encapsulation: ViewEncapsulation.None,
  styleUrls: ["./date-picker.component.scss"],
  providers: [
    { provide: NgbCalendar, useClass: NgbCalendarPersian },
    { provide: NgbDatepickerI18n, useClass: NgbDatepickerI18nPersian }
  ]
})
export class AXDatePickerComponent extends AXDatePickerBaseComponent {
  validate(): Promise<import("../validation/validation.classs").IValidationRuleResult> {
    throw new Error("Method not implemented.");
  }
  model: NgbDateStruct;
  date: { year: number; month: number };
  @Input() label: string = "تاریخ";
  constructor(private calendar: NgbCalendar) {
    super();
  }

  selectToday() {
    this.model = this.calendar.getToday();
  }
}
