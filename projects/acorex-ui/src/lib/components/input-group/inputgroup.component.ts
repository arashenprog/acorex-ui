import { Component, Output, EventEmitter, Input } from "@angular/core";
import { ButtonItem } from "../../core/menu.class";

@Component({
  selector: "ax-input-group",
  templateUrl: "./inputgroup.component.html"
})
export class AXInputGroupComponent {
  @Input() startButtons: ButtonItem[] = [];
  @Input() endButtons: ButtonItem[] = [];

  @Output() onClickStartButton = new EventEmitter<ButtonItem>();

  onClickStartButtonInner(item: ButtonItem) {
    this.onClickStartButton.emit(item);
  }
}
