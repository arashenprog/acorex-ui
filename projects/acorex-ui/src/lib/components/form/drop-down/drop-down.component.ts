import { Component, OnInit, Input, ViewChild, TemplateRef, ContentChild } from "@angular/core";
import { SelectItem } from "../../../core/select.class";
import { AXSelectBaseComponent } from "../../../core/base.class";
import { AXPopoverComponent } from "../../layout/popover/popover.component";

@Component({
  selector: "ax-drop-down",
  templateUrl: "./drop-down.component.html",
  styleUrls: ["./drop-down.component.scss"]
})
export class AXDropDownComponent extends AXSelectBaseComponent {
  @ViewChild("popSelectBox")
  popSelectBox: AXPopoverComponent;

  @Input() items: SelectItem[] = [];
  @Input() allowSearch: boolean = false;
  @Input() icon: string = "fas fa-angle-down";
  @Input() fitParent: boolean = true;

  @Input()
  @ContentChild('editorTemplate')
  editorTemplate: TemplateRef<any>;

  close() {
    this.popSelectBox.close();
  }

  focus(): void { }

  handleDropdownButtonClick(e: MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
    this.popSelectBox.toggle()
  }
}
