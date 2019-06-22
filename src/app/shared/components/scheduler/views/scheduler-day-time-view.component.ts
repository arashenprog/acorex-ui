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

    days: any[] = []

    times: any[] = []

    ngOnInit(): void {
        let startDate = new Date();
        for (let i = 0; i < this.visibleDayCount; i++) {
            this.days.push(startDate);
            startDate=new Date(startDate.setDate(startDate.getDate() + 1));
        }
        for (let i = 0; i < 24; i++) {
            this.times.push(('0' + i).slice(-2) + ":00");
        }
    }
}
