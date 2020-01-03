import { Component, Input, Output, EventEmitter, ContentChild, TemplateRef, ContentChildren, QueryList } from "@angular/core";
import { AXBaseComponent } from "../../../core/base.class";
import { AXPanelBoxComponent } from "../panel-box/panel-box.component";

@Component({
  selector: "ax-accordion",
  template: "<ng-content></ng-content>",
})
export class AXAccordionComponent extends AXBaseComponent {

  @ContentChildren(AXPanelBoxComponent)
  panels: QueryList<AXPanelBoxComponent>;

  @Input()
  multiple: boolean = false;

  constructor() {
    super()
  }

  ngAfterContentInit() {
    this.panels.forEach(p => {
      if (this.multiple == false)
        p.collapsed = true;
      p.collapsedChange.subscribe((v: boolean) => {
        this.handleCollapsedChanged(p, v);
      });
    });
    if (this.multiple == false)
      this.panels.first.collapsed = false;
  }

  private handleCollapsedChanged(panel: AXPanelBoxComponent, value: boolean) {
    if (value == false && this.multiple == false) {
      this.panels.forEach(p => {
        if (p != panel)
          p.collapsed = true;
      });
    }
  }


}
