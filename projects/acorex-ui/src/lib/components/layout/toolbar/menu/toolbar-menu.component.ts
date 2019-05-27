import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  ViewChild,
  ElementRef,
  ViewEncapsulation
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

 

  @Input()
  items: MenuItem[] = [];

  @Output()
  itemClick: EventEmitter<MenuItem> = new EventEmitter<MenuItem>();

  ngAfterViewInit(): void {}

  // fix this fucking event \o/
  onToolbarItemClick(item: MenuItem,event) {
    if (!(item.items && item.items.length)) {
      this.itemClick.emit(item);
    }
    
   if(event.target.tagName == "SPAN"){
     event.target.parentNode.onclick
   }
   console.log(event.target)
   
  }
  
}
