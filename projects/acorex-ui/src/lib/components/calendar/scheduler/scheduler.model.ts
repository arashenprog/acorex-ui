import { AXDateTime, AXDateTimeRange } from "../../../core/calendar/datetime";

export interface AXSchedulerEvent {
    range: AXDateTimeRange,
    title: string,
    description?: string;
}

export interface AXSchedulerOccasion {
    range: AXDateTimeRange,
    title: string,
    description?: string;
    blocked?: boolean;
}




