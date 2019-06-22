import { Component, OnInit, Attribute, Input } from '@angular/core';

@Component({
    selector: 'ax-scheduler-day-time-view',
    templateUrl: './scheduler-day-time-view.component.html'
})
export class AXSchedulerDayTimeViewComponent implements OnInit {
    constructor() { }

    @Input()
    timeSlot: number = 1;


    @Input()
    visibleDayCount: number = 1;

    ngOnInit(): void { }
}
