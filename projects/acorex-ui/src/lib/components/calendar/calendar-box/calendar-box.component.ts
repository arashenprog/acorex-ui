import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AXDateTime, AXDateTimeRange } from '../../../core/calendar/datetime';

@Component({
    selector: 'ax-calendar-box',
    templateUrl: './calendar-box.component.html',
    styleUrls: ['./calendar-box.component.scss']
})
export class AXCalendarBoxComponent {
    constructor() {
        this.value =  new AXDateTime()
    }

    view: "year" | "month" | "day" = "day";

    viewRange: AXDateTimeRange;

    @Output()
    onChanged:EventEmitter<AXDateTime> = new EventEmitter<AXDateTime>();

    private _value: AXDateTime;
    @Input()
    public get value(): AXDateTime {
        return this._value;
    }
    public set value(v: AXDateTime) {
        this._value = v;
        this.setFocus(v);
        this.onChanged.emit(v);
    }


    focusedValue: AXDateTime;
    today: AXDateTime = new AXDateTime();



    prev() {
        this.navigate(-1)
    }

    next() {
        this.navigate(1)
    }

    navigate(value: number) {
        debugger;
        let start: AXDateTime;
        let end: AXDateTime;
        if (this.view == "day") {
            start = this.viewRange.startTime.add("day", 15).add("month", value).startOf("month").firstDayOfWeek;
            end = start.add("day", 15).endOf("month").endDayOfWeek;
        }
        else if (this.view == "month") {
            start = this.viewRange.startTime.startOf("year").add("year", value);
            end = start.endOf("year");
        }
        else if (this.view == "year") {
            start = this.viewRange.startTime.startOf("year").add("year", value);
            start = start.add("year", -4);
            end = start.add("year", 8);
        }
        this.viewRange = new AXDateTimeRange(start, end)
    }

    changeView() {
        if (this.view == "day")
            this.view = "month";
        else if (this.view == "month")
            this.view = "year";
        //
        this.navigate(0);
    }

    matrixify(arr: any[], cols) {
        let rows = Math.ceil(arr.length / cols);
        let matrix = [];
        if (rows * cols === arr.length) {
            for (let i = 0; i < arr.length; i += cols) {
                matrix.push(arr.slice(i, cols + i));
            }
        }
        return matrix;
    };

    setDay(date: AXDateTime) {
        this.value =  date;
        this.view = "day";
    }

    setMonth(date: AXDateTime) {
        this.setFocus(this.value.clone().set("year", date.year).set("month", date.monthOfYear));
        this.view = "day";
    }

    setYear(date: AXDateTime) {
        this.setFocus(this.value.clone().set("year", date.year));
        this.view = "month";
        this.navigate(0);
    }

    setFocus(date: AXDateTime) {
        this.focusedValue = date;
        this.viewRange = new AXDateTimeRange(date.startOf("month").startOf('week'), date.endOf("month").endOf("week"));
    }


}
