import { Pipe, PipeTransform, Injectable } from "@angular/core";

@Pipe({ name: "separator" })
@Injectable({
  providedIn: "root"
})
export class AXSeparatorPipe implements PipeTransform {
  transform(value: string) {
    if (value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    else {
      return "0";
    }
  }
}
