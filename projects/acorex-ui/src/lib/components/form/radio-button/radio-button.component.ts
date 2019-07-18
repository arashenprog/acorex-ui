import { Component, Input, ViewEncapsulation } from "@angular/core";
import { AXCheckedBaseComponent } from "../../../core/base.class";

@Component({
  selector: "ax-radio-button",
  templateUrl: "./radio-button.component.html",
  styleUrls: ["./radio-button.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class AXRadioButton extends AXCheckedBaseComponent {
  @Input() group: string = "GroupName";
}
