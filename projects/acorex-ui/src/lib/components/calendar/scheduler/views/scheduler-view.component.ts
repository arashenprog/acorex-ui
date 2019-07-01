import { Input, EventEmitter, OnDestroy } from "@angular/core";
import { AXDateTime, AXDateTimeRange, TimeUnit } from "../../../../core/calendar/datetime";
import { AXSchedulerEvent } from "../scheduler.model";
import { Output } from "@angular/core";
import { PromisResult } from "../../../../core/base.class";
import { Observable } from "rxjs";

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
    uid?:string;
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

    slots: AXSchedulerSlot[] = [];

    getEvents(range: AXDateTimeRange, unit: TimeUnit) {
        return this.events.filter(c => c.range.startTime.equal(range.startTime, unit))
    }

    ngAfterViewChecked(): void {
        this.updateSize();
    }

    @Output()
    onEventChanged: EventEmitter<AXSchedulerEventChangeArgs> = new EventEmitter<AXSchedulerEventChangeArgs>(true);

    ngOnInit(): void {

    }

    ngOnDestroy(): void {
        if (this.onEventChanged)
            this.onEventChanged.unsubscribe()
        if (this.slots)
            this.slots = null;
        if (this.events)
            this.events = null;
    }

}