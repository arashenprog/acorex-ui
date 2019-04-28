import { Component, Input } from "@angular/core";
import { AXTextBaseComponent } from "../../core/base.class";

@Component({
  selector: "ax-label-box",
  templateUrl: "./label-box.component.html"
})
export class AXLabelBoxComponent extends AXTextBaseComponent {
  @Input() hint: string = null;
}
