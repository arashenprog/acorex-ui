import { Component, Input, ViewChild, ElementRef } from "@angular/core";
import { SelectItem } from "../../../core/select.class";
import { AXSelectBaseComponent } from "../../../core/base.class";
import { AXPopoverComponent } from "../../layout/popover/popover.component";
import { AXDropDownComponent } from "../drop-down/drop-down.component";

@Component({
  selector: "ax-select-box",
  templateUrl: "./select-box.component.html",
  styleUrls: ["./select-box.component.scss"]
})
export class AXSelectBoxComponent extends AXSelectBaseComponent {
  _value: string = ""
  
  constructor() {
    super();
  }
  @ViewChild("d") dropdown: AXDropDownComponent

  @Input() items: SelectItem[] = [];
  @Input() searchable: boolean = false;
  @Input() label: string;


  onItemClick(item: SelectItem) {
    debugger
    console.log(item)
    this._value = item.text;
    this.dropdown.close()
  }
}
