import { Input, EventEmitter, OnDestroy } from "@angular/core";
import { AXDateTime, AXDateTimeRange, TimeUnit } from "../../../../core/calendar/datetime";
import { AXSchedulerEvent } from "../scheduler.model";
import { Output } from "@angular/core";

export interface AXSchedulerRequestDataArge {
    startTime: AXDateTime;
    endTime: AXDateTime;
    events: AXSchedulerEvent[];
}

export interface AXSchedulerEventChangeArgs {
    event: AXSchedulerEvent;
    oldSlot: AXSchedulerSlot;
    newSlot: AXSchedulerEvent;
}

export interface AXSchedulerSlot {
    range: AXDateTimeRange;
    events?: AXSchedulerEvent[];
}



export abstract class AXSchedulerBaseViewComponent implements OnDestroy {

    timeSlot: number = 1;

    interval: number = 1;

    abstract updateSize(): void;

    abstract next(): void;

    abstract prev(): void;

    abstract navigate(date: AXDateTime): void;


    today: AXDateTime = new AXDateTime();

    navigatorDate: AXDateTime = new AXDateTime();
    events: AXSchedulerEvent[] = [];

    slots: AXSchedulerSlot[] = []

    getEvents(range: AXDateTimeRange, unit: TimeUnit) {
        return this.events.filter(c => c.range.startTime.equal(range.startTime, unit))
    }

    ngAfterViewChecked(): void {
        this.updateSize();
    }

    @Output()
    onEventChanged: EventEmitter<AXSchedulerEventChangeArgs> = new EventEmitter<AXSchedulerEventChangeArgs>();

    ngOnDestroy(): void {
        if (this.onEventChanged)
            this.onEventChanged.unsubscribe()
        if (this.slots)
            this.slots = null;
        if (this.events)
            this.events = null;
    }

}