import { Input, EventEmitter } from "@angular/core";
import { AXDateTime, AXDateTimeRange } from "../../../../core/calendar/datetime";
import { AXSchedulerEvent } from "../scheduler.model";

export interface AXSchedulerRequestDataArge {
    startTime: AXDateTime;
    endTime: AXDateTime;
    events: AXSchedulerEvent[];
}

export interface AXSchedulerSlot {
    range:AXDateTimeRange;
    events?: AXSchedulerEvent[];
}



export abstract class AXSchedulerBaseViewComponent {
    timeSlot: number = 1;

    interval: number = 1;

    abstract updateSize(): void;

    abstract next(): void;

    abstract prev(): void;

    abstract navigate(date: AXDateTime);

    today: AXDateTime = new AXDateTime();

    navigatorDate: AXDateTime = new AXDateTime();
    events: AXSchedulerEvent[] = [];

    slots: AXSchedulerSlot[] = []

    getEvents(range:AXDateTimeRange)
    {
        //return this.slots.filter(c=>)
    }
}