import { Pipe, PipeTransform, Injectable } from "@angular/core";

@Pipe({ name: "seprator" })
@Injectable({
  providedIn: "root"
})
export class AXSepratorPipe implements PipeTransform {
  transform(value: string) {
    if (value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }
}
