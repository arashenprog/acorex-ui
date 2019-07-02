import { Component, OnInit, Input, ElementRef, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { AXDateTime, AXDateTimeRange } from '../../../../../core/calendar/datetime';
import { AXSchedulerBaseViewComponent, AXSchedulerSlot, AXSchedulerEventChangeArgs } from '../scheduler-view.component';

@Component({
    templateUrl: './scheduler-agenda-view.component.html',
    styleUrls:['./scheduler-agenda-view.component.scss'],
    encapsulation:ViewEncapsulation.None,
    providers: [{ provide: AXSchedulerBaseViewComponent, useExisting: AXSchedulerAgendaViewComponent }]
})
export class AXSchedulerAgendaViewComponent extends AXSchedulerBaseViewComponent {
    constructor(private elm: ElementRef<HTMLDivElement>, private cdr: ChangeDetectorRef) { super(); }



    updateSize() {
    }


    navigate(date: AXDateTime = new AXDateTime()) {
        this.navigatorDate = date;
        this.slots = [];
        for (let i = 0; i < this.interval; i++) {
            let d = date.addDay(i);
            let range = new AXDateTimeRange(d, d);
            let slot: AXSchedulerSlot = {
                range: range,
                events: this.getEvents(range, "day")
            }
            this.slots.push(slot);
        }
        this.cdr.detectChanges();
    }

    next(): void {
        this.navigate(this.navigatorDate.addDay(this.interval));
    }
    prev(): void {
        this.navigate(this.navigatorDate.addDay(-this.interval));
    }



}
