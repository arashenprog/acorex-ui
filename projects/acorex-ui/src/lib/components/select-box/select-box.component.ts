import { Component, Input, EventEmitter, Output } from "@angular/core";
import { SelectItem } from "../../core/select.class";
import { AXSelectBaseComponent } from "../../core/base.class";

@Component({
  selector: "ax-select-box",
  templateUrl: "./select-box.component.html"
})
export class AXSelectBoxComponent extends AXSelectBaseComponent {
  @Input() items: any[] = [];
}
