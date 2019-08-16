import { PipeTransform, Pipe } from "@angular/core";
import { AXDateTime } from "./datetime";

@Pipe({ name: "dt" })
export class AXDateTimePipe implements PipeTransform {
    constructor() { }

    transform(value: AXDateTime | Date, format: string): string {
        if (value == null)
            return "";
        if (!format)
            value.toString();
        if (value instanceof Date)
            return new AXDateTime(value).format(format);
        else
            return value.format(format);


    }
}