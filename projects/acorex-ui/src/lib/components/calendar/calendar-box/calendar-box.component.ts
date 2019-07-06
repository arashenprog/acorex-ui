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
        this.viewRange = new AXDateTimeRange(v.startOf("month").startOf('week'), v.endOf("month").endOf("week"));
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
        debugger;
        let start: AXDateTime;
        let end: AXDateTime;
        if (this.view == "day") {
            start = this.viewRange.startTime.startOf("month").add("month", value);
            end = start.endOf("month");
        }
        else if (this.view == "month") {
            start = this.viewRange.startTime.startOf("year").add("year", value);
            end = start.endOf("year");
        }
        else if (this.view == "year") {
            start = this.viewRange.startTime.startOf("year").add("year", value * 10);
            end = start.add("year", 10);
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
}
