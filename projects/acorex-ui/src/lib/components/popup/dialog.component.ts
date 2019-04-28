import { Component, OnInit, Input } from "@angular/core";
import { ButtonItem } from "../../core/menu.class";

@Component({
  selector: "ax-dialog",
  templateUrl: "./dialog.component.html"
})
export class AXDialogComponent implements OnInit {
  @Input()
  message: string = "متن توضیحات";

  @Input()
  buttons: ButtonItem[] = [];

  constructor() {}

  ngOnInit(): void {}

  onClick: Function;

  onInnerClick(item: ButtonItem) {
    if (this.onClick) this.onClick(item);
  }
}
