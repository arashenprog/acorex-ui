import { Input } from "@angular/core";
import { AXDateTime } from "../../../../core/calendar/datetime";

export abstract class AXSchedulerBaseViewComponent
{
    timeSlot: number = 1;
    
    interval: number = 1;

    

    abstract updateSize():void;

    abstract next():void;

    abstract prev():void;
    
    abstract navigate(date:AXDateTime);

    today: AXDateTime = new AXDateTime();
    navigatorDate: AXDateTime =  new AXDateTime();
    
}