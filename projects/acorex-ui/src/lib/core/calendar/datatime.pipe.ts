import { PipeTransform, Pipe } from "@angular/core";
import { AXDateTime } from "./datetime";

@Pipe({ name: "dt" })
export class AXDateTimePipe implements PipeTransform {
    constructor() { }

    transform(value: any, format: string): string {
        let date: AXDateTime = AXDateTime.convert(value);
        if (value == null)
            return "";
        if (!format)
            date.toString();
        else
            return date.format(format);
    }
}