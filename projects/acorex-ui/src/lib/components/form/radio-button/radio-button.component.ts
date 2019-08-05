import { Component, Input, ViewEncapsulation, ChangeDetectorRef, ChangeDetectionStrategy } from "@angular/core";
import { AXCheckedBaseComponent } from "../../../core/base.class";

@Component({
  selector: "ax-radio-button",
  templateUrl: "./radio-button.component.html",
  styleUrls: ["./radio-button.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXRadioButton extends AXCheckedBaseComponent {
  @Input() group: string = "GroupName";

  constructor(protected cdr: ChangeDetectorRef) {
    super(cdr);
  }
}
