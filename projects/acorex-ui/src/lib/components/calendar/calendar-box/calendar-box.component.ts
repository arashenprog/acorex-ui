import { Component, OnInit } from '@angular/core';
import { AXDateTime, AXDateTimeRange } from '../../../core/calendar/datetime';

@Component({
    selector: 'ax-calendar-box',
    templateUrl: './calendar-box.component.html',
    styleUrls: ['./calendar-box.component.scss']
})
export class AXCalendarBoxComponent implements OnInit {
    constructor() {
        this.value = new AXDateTime()
    }

    view: "year" | "month" | "day" = "day";

    viewRange: AXDateTimeRange;

    private _value: AXDateTime;
    public get value(): AXDateTime {
        return this._value;
    }
    public set value(v: AXDateTime) {
        this._value = v;
        this.viewRange = new AXDateTimeRange(v.startOf("month"), v.endOf("month"))
    }


    ngOnInit(): void {

    }

    prev() {
        this.navigate(-1)
    }

    next() {
        this.navigate(1)
    }

    navigate(value: number) {
        let start: AXDateTime;
        let end: AXDateTime;
        if (this.view == "day") {
            start = this.viewRange.startTime.add("month", value).startOf("month");
            end = this.viewRange.endTime.add("month", value).endOf("month");
        }
        else if (this.view == "month") {
            start = this.viewRange.startTime.add("year", value).startOf("year");
            end = this.viewRange.endTime.add("year", value).endOf("year");
        }
        this.viewRange = new AXDateTimeRange(start, end)
    }

    changeView() {
        if (this.view == "day")
            this.view = "month";
        else if (this.view == "month")
            this.view = "year";
    }
}
