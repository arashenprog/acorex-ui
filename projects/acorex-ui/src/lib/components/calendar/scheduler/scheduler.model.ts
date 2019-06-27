import { AXDateTime, AXDateTimeRange } from "../../../core/calendar/datetime";

export interface AXSchedulerEvent {
    range: AXDateTimeRange,
    title: string,
    description?: string;
    uid:string;
    color:string;
}

export interface AXSchedulerOccasion {
    range: AXDateTimeRange,
    title: string,
    description?: string;
    blocked?: boolean;
}




