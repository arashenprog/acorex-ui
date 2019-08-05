import { Component, Input } from "@angular/core";
import { CheckItem } from "../../../core/menu.class";
import { AXBaseComponent } from "../../../core/base.class";

@Component({
  selector: "ax-selection-list",
  templateUrl: "./selection-list.component.html"
})
export class AXSelectionListComponent extends AXBaseComponent {
  _uid: string = "M" + Math.ceil(Math.random() * 10000);
  @Input() direction: string = "horizontal";
  @Input() items: Array<CheckItem> = [];
  @Input() mode: string = "single";

  onRadioValueChange(item: CheckItem) {
    debugger;
    this.items.forEach(c => {
      c.selected = c.value == item.value;
    });
  }
}
