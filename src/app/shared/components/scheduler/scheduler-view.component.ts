import { Component, OnInit, Attribute, Input } from '@angular/core';

@Component({
    selector: 'ax-scheduler-view',
    template: `
    <ng-container *ngIf="visible">
        <div [ngSwitch]="type">
            <ax-scheduler-day-time-view *ngSwitchCase="'day'" timeSlot="1" [interval]="interval">
            </ax-scheduler-day-time-view>

            <ax-scheduler-day-time-view *ngSwitchCase="'week'" timeSlot="1" [interval]="interval*7">
            </ax-scheduler-day-time-view>

        </div>
    </ng-container>
    `
})
export class AXSchedulerViewComponent {
    constructor(
        @Attribute('type') public type: 'day' | 'month' | 'week',
        @Attribute('title') public title: string,
        @Attribute('name') public name: string,
    ) {

    }


    @Input()
    public interval: number;


    ngOnInit(): void {
        if (!this.interval) {
            if (this.type == "day")
                this.interval = 1;
            if (this.type == "week")
                this.interval = 1;
        }
    }

    @Input()
    visible: boolean = false;
}
