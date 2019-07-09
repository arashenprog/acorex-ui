import { AXDateTime, AXDateTimeRange } from "../../../core/calendar/datetime";
import { EventEmitter } from "@angular/core";


export type AXSchedulerViewType = "day" | "week" | "month" | "timeline" | "agenda";

export interface AXSchedulerRequestDataArge {
    startTime: AXDateTime;
    endTime: AXDateTime;
    events: AXSchedulerEvent[];
}

export abstract class AXAsyncEventArgs {
    onComplete: EventEmitter<any> = new EventEmitter<any>(true);
    complete(): void {
        if (this.onComplete) {
            this.onComplete.emit(this);
        }
    }
}

export class AXSchedulerEventChangeArgs extends AXAsyncEventArgs {
    canceled: boolean = false;
    event: AXSchedulerEvent;
    oldSlot: AXSchedulerSlot;
    newSlot: AXSchedulerSlot;
}

export interface AXSchedulerSlot {
    range: AXDateTimeRange;
    events?: AXSchedulerEvent[];
    uid?: string;
}

export interface AXSchedulerEvent {
    range: AXDateTimeRange,
    title: string,
    description?: string;
    uid: string;
    color: string;
}

export interface AXSchedulerOccasion {
    range: AXDateTimeRange,
    title: string,
    description?: string;
    blocked?: boolean;
}
