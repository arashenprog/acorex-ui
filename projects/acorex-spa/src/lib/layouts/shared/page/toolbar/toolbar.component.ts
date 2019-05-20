import { Component, AfterViewInit, DoCheck, Input, Output, EventEmitter } from "@angular/core";
import { MenuItem } from 'acorex-ui';


@Component({
  selector: "ax-page-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.scss"]
})
export class AXPageToolbarComponent implements AfterViewInit {
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
