import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  ViewChild,
  ElementRef,
  ViewEncapsulation,
  ViewChildren,
  QueryList
} from "@angular/core";
import { AXToolbarItem } from "../toolbar-item";
import { MenuItem } from "../../../../core/menu.class";

@Component({
  selector: "ax-toolbar-menu",
  templateUrl: "./toolbar-menu.component.html",
  styleUrls: ["./toolbar-menu.component.scss"],
  providers: [{ provide: AXToolbarItem, useExisting: AXToolbarMenuComponent }],
  encapsulation: ViewEncapsulation.None
})
export class AXToolbarMenuComponent extends AXToolbarItem {
  constructor() {
    super();
  }


  @ViewChildren("NavItem") NavItem: QueryList<AXToolbarMenuComponent>
  @Input()
  items: MenuItem[] = [];

  @Output()
  itemClick: EventEmitter<MenuItem> = new EventEmitter<MenuItem>();

  ngAfterViewInit(): void { }

  // fix this fucking event \o/
  onToolbarItemClick(item: MenuItem, event) {
    if (!(item.items && item.items.length)) {
      this.itemClick.emit(item);
    }
    //debugger
    let selected = event.target;
    let childrens = selected.children;
    for (let i = 0; i < childrens.length; i++) {
      let el = childrens[i];

      if (el.nodeName == "UL") {
        el.classList.toggle("active")
      }
    }




  }
  onSpanClick() {
    return false
  }

}
