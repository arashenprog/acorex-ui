import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AXDateTime, AXDateTimeRange } from '../../../core/calendar/datetime';

export type AXCalendarViewType = "year" | "month" | "day";

@Component({
    selector: 'ax-calendar-box',
    templateUrl: './calendar-box.component.html',
    styleUrls: ['./calendar-box.component.scss']
})
export class AXCalendarBoxComponent {

    constructor() {

        this.viewRange = new AXDateTimeRange(this.today.month.startDate, this.today.month.endDate);
        this.value = new AXDateTime();
        this.view = "day";
    }

    showTodayButton: boolean = false;

    matrix: any = [];

    private _view: AXCalendarViewType = "day";
    @Input()
    public get view(): AXCalendarViewType {
        return this._view;
    }
    public set view(v: AXCalendarViewType) {
        this._view = v;

        this.navigate(0);
    }

    private _depth: AXCalendarViewType;

    @Input()
    public get depth(): AXCalendarViewType {
        return this._depth;
    }
    public set depth(v: AXCalendarViewType) {
        this._depth = v;
        this.view = v;
    }

    viewRange: AXDateTimeRange;

    @Output()
    onChanged: EventEmitter<AXDateTime> = new EventEmitter<AXDateTime>();

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

    ngAfterViewInit(): void {
        this.navigate(0);
    }

    prev() {
        this.navigate(-1)
    }

    next() {
        this.navigate(1)
    }

    navigate(value: number | AXDateTime) {
        debugger;
        let start: AXDateTime;
        let end: AXDateTime;
        if (this.view == "day") {
            let fd: AXDateTime;
            if (value instanceof AXDateTime)
                fd = value.startOf("month");
            else
                fd = this.viewRange.startTime.add("day", 15).add("month", value).startOf("month")
            //
            start = fd.firstDayOfWeek;
            end = fd.endOf("month").endDayOfWeek;
        }
        else if (this.view == "month") {
            let fd: AXDateTime;
            if (value instanceof AXDateTime)
                fd = value.startOf("year");
            else
                fd = this.viewRange.startTime.add("day", 15).add("year", value).startOf("year");
            //
            start = fd;
            end = fd.endOf("year");
        }
        else if (this.view == "year") {
            let fd: AXDateTime;
            if (value instanceof AXDateTime)
                fd = value.startOf("year");
            else
                fd = this.viewRange.startTime.add("day", 15).add("year", value * 10).startOf("year");
            //
            start = fd.add("year", -4);
            end = start.add("year", 8).endOf("year");
        }
        this.viewRange = new AXDateTimeRange(start, end);
        if (this.view == "day") {
            this.matrix = this.matrixify(this.viewRange.enumurate('day'), 7);
        }
        else if (this.view == "month") {
            this.matrix = this.matrixify(this.viewRange.enumurate('month'), 3);
        }
        else if (this.view == "year") {
            this.matrix = this.matrixify(this.viewRange.enumurate('year'), 3);
        }
    }

    changeView() {
        if (this.view == "day") {
            this.view = "month";

        }
        else if (this.view == "month") {
            this.view = "year";
        }
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
        this.value = date;
        this.view = "day";
    }

    setMonth(date: AXDateTime) {
        if (this.depth == "month") {
            this.value = date;
        }
        else {
            debugger;
            this.view = "day";
            this.setFocus(this.value.clone().set("year", date.year).set("month", date.monthOfYear));
        }
    }

    setYear(date: AXDateTime) {
        if (this.depth == "year") {
            this.value = date;
        }
        else {
            this.view = "month";
            this.setFocus(this.value.clone().set("year", date.year));
        }
    }

    setFocus(date: AXDateTime) {
        this.focusedValue = date;
        this.navigate(this.focusedValue);
    }


    setToday() {
        this.value = this.today;
    }
}
