import { Component, Attribute, Input } from '@angular/core';
import { trigger, style, state, transition, animate } from '@angular/animations';

@Component({
    selector: 'ax-scheduler-view',
    template: `
    <ng-container *ngIf="visible"  @easeInOut>
        <div [ngSwitch]="type">
            <ax-scheduler-day-time-view  *ngSwitchCase="'day'" timeSlot="1" [interval]="interval">
            </ax-scheduler-day-time-view>
            <ax-scheduler-day-time-view  *ngSwitchCase="'week'" timeSlot="1" [interval]="interval*7">
            </ax-scheduler-day-time-view>
            <ax-scheduler-month-view  *ngSwitchCase="'month'" timeSlot="1" [interval]="interval">
            </ax-scheduler-month-view>
        </div>
    </ng-container>
    `,
    animations: [
        trigger('easeInOut', [
            transition(':enter', [
                style({
                    opacity: 0
                }),
                animate("1s ease-in-out", style({
                    opacity: 1
                }))
            ]),
            transition(':leave', [
                style({
                    opacity: 1
                }),
                animate("1s ease-in-out", style({
                    opacity: 0
                }))
            ])
        ])
    ]
})
export class AXSchedulerViewComponent {
    constructor(
        @Attribute('type') public type: string,
        @Attribute('caption') public caption: string,
        @Attribute('name') public name: string,
    ) {

    }


    @Input()
    public interval: number;


    ngOnInit(): void {
        if (!this.interval) {
            this.interval = 1;
        }
    }

    @Input()
    visible: boolean = false;
}
