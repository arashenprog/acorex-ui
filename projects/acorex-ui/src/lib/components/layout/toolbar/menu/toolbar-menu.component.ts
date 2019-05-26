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

  public shouldShow = true;
  @ViewChild("myLabel") lab;

  @Input()
  items: MenuItem[] = [];

  @Output()
  itemClick: EventEmitter<MenuItem> = new EventEmitter<MenuItem>();

  ngAfterViewInit(): void {}

  onToolbarItemClick(item: MenuItem) {
    if (!(item.items && item.items.length)) {
      this.itemClick.emit(item);
    }
    if (item.items.length) {
      this.showOrHideManually();
    }
  }
  showOrHideManually() {
    debugger;
    this.shouldShow = !this.shouldShow;
    if (this.shouldShow) {
      this.lab.nativeElement.classList.add("show");
      this.lab.nativeElement.classList.remove("hide");
    } else {
      this.lab.nativeElement.classList.add("hide");
      this.lab.nativeElement.classList.remove("show");
    }
  }
}
