import { Component, AfterViewInit, DoCheck, Input, Output, EventEmitter } from "@angular/core";
import { MenuItem } from "shared/components/classes/menu.class";


@Component({
  selector: "toolbar",
  templateUrl: "./toolbar.layout.html",
  styleUrls: ["./toolbar.layout.scss"]
})
export class AXToolbarComponent implements AfterViewInit {
  @Input()
  items: MenuItem[] = []


  @Output()
  itemClick: EventEmitter<MenuItem> = new EventEmitter<MenuItem>();

  ngAfterViewInit(): void {
  }

  constructor() {

  }

  onToolbarItemClick(item: MenuItem) {
    if (!(item.items && item.items.length)) {
      this.itemClick.emit(item);
    }

  }

}
