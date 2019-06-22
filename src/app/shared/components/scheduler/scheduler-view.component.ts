import { Component, OnInit, Attribute, Input } from '@angular/core';

@Component({
    selector: 'ax-scheduler-view',
    template: `
    <ng-container *ngIf="visible">
        <div [ngSwitch]="view">
            <ax-scheduler-day-time-view *ngSwitchCase="'day'" timeSlot="1" visibleDayCount="1">
            </ax-scheduler-day-time-view>

            <ax-scheduler-day-time-view *ngSwitchCase="'week'" timeSlot="1" visibleDayCount="7">
            </ax-scheduler-day-time-view>
        </div>
    </ng-container>
    `
})
export class AXSchedulerViewComponent implements OnInit {
    constructor(
        @Attribute('view') public view: 'day' | 'month' | 'week'
    ) {

    }


    @Input()
    visible: boolean = false;


    ngOnInit(): void {
        console.log("VIEW ngOnInit")  ;
     }

    ngAfterViewInit(): void {
        console.log("VIEW ngAfterViewInit")  ;      
    }
}
