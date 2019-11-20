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
  @ViewChild("popSelectBox", /* TODO: add static flag */ {})
  popSelectBox: AXPopoverComponent;

  @Input() items: SelectItem[] = [];
  @Input() allowSearch: boolean = false;
  @Input() icon: string = "fas fa-angle-down";
  @Input() fitParent: boolean = true;

  @ContentChild('editorTemplate', /* TODO: add static flag */ {})
  _contentEditorTemplate: TemplateRef<any>;

  private _editorTemplate: TemplateRef<any>;
  @Input()
  public get editorTemplate(): TemplateRef<any> {
    return this._editorTemplate ? this._editorTemplate : this._contentEditorTemplate;
  }
  public set editorTemplate(v: TemplateRef<any>) {
    this._editorTemplate = v;
  }


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
