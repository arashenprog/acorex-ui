
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, Attribute } from "@angular/core";
import { AXToolbarItem } from "../toolbar-item";
import { BaseMenuItem, MenuItem } from "../../../../core/menu.class";
import { AXHtmlUtil } from "../../../../core/utils/html/html-util";
import { AXPopoverComponent } from "../../popover/popover.component";

@Component({
  selector: "ax-toolbar-dropdown",
  template: `
  <div id="{{_uid}}">
    <ax-toolbar-menu [items]="items"  (itemClick)="onItemClick($event)"></ax-toolbar-menu>
    <ax-popover target="#{{_uid}}" placement="bottom-start" alignment="top-start" #pop>
      <div class="ax-pad-sm">
        <ng-content></ng-content>
      </div>
    </ax-popover>
  </div>
  `,
  providers: [
    { provide: AXToolbarItem, useExisting: AXToolbarDropdownComponent }
  ]
})
export class AXToolbarDropdownComponent {

  constructor(
    @Attribute('icon')
    public icon: string,
    @Attribute('text')
    public text: string
  ) {
  }

  _uid: string = AXHtmlUtil.getUID();

  items: MenuItem[] = [];



  ngAfterViewInit(): void {
    this.items = [
      {
        name: "action",
        icon: this.icon,
        text: this.text,
        endIcon : "fas fa-angle-down"
      }]

  }

  @ViewChild('pop')
  pop: AXPopoverComponent;


  onItemClick(e: MenuItem) {
    this.pop.toggle();
  }
}
