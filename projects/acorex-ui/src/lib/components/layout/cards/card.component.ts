import { Component, Input } from "@angular/core";
import { AXCardBaseComponent } from "../../../core/base.class";
import { ButtonItem } from "../../../core/menu.class";

@Component({
  selector: "ax-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.scss"]
})
export class AXCardComponent extends AXCardBaseComponent {
  @Input()
  buttons: ButtonItem[] = [];

  onClick: Function;

  onInnerClick(item: ButtonItem) {
    if (this.onClick) this.onClick(item);
  }
}
