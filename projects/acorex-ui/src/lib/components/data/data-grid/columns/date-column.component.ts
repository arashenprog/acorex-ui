
import {
  Component,
  ChangeDetectionStrategy,
  Input
} from "@angular/core";
import { AXGridDataColumn } from "./column.component";
import { AXDateTime } from "../../../../core/calendar/datetime";

@Component({
  selector: "ax-date-column",
  template: "",
  providers: [{ provide: AXGridDataColumn, useExisting: AXGridDateColumn }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXGridDateColumn extends AXGridDataColumn {
  constructor() {
    super();
  }

  @Input()
  format: string = "YYYY-MM-DD";

  render() {
    let THAT = this;
    let col = super.render();


    col.cellRendererParams = {
      format: this.format,
    }
    col.comparator = (valueA: any, valueB: any, nodeA, nodeB, isInverted) => {
      let date1 = AXDateTime.convert(valueA);
      let date2 = AXDateTime.convert(valueB);
      //
      if (date1 === null && date2 === null) {
        return 0;
      }
      if (date1 === null) {
        return -1;
      }
      if (date2 === null) {
        return 1;
      }
      return (date1.date.getTime() - date2.date.getTime());
    };

    col.valueFormatter = function (params) {
      let date: AXDateTime = AXDateTime.convert(params.value);
      if (date)
        return date.format(THAT.format)
      else
        return null
    }

    return col;
  }
}
