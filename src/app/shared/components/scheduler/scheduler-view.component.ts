import { Component, OnInit, Attribute } from '@angular/core';

@Component({
    selector: 'ax-scheduler-view',
    template: `
    <div [ngSwitch]="view">
        <ax-scheduler-day-time-view *ngSwitchCase="'day'" timeSlot="1" visibleDayCount="1">
        </ax-scheduler-day-time-view>

        <ax-scheduler-day-time-view *ngSwitchCase="'week'" timeSlot="1" visibleDayCount="7">
        </ax-scheduler-day-time-view>
    </div>
    `
})
export class AXSchedulerViewComponent implements OnInit {
    constructor(
        @Attribute('view') public view: 'day' | 'month' | 'week'
    ) {

    }


    ngOnInit(): void { }
}
