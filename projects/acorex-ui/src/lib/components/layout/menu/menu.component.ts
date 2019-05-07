import { Component, OnInit, ViewEncapsulation, Input } from "@angular/core";
import { MenuItem } from "../../../core/menu.class";
@Component({
  selector: "ax-menu",
  templateUrl: "./menu.component.html",
  encapsulation: ViewEncapsulation.None,
  styleUrls: ["./menu.component.scss"]
})
export class AXMenuComponent implements OnInit {
  private _items: MenuItem[];
  @Input()
  public get items(): MenuItem[] {
    return this._items;
  }
  public set items(v: MenuItem[]) {
    this._items = v;
    this.refresh();
  }

  lastLevel: MenuItem = null;
  selectedLevel: MenuItem[] = [];
  private currentlevel: number = 0;

  ngOnInit() {
    this.refresh();
  }

  private refresh() {
    this.selectedLevel = this.items.slice();
  }

  onItemClick(item: MenuItem) {
    if (item.items && item.items.length) {
      this.currentlevel++;
      this.lastLevel = Object.assign({}, item);
      this.selectedLevel = item.items.slice();
    }
  }

  onBackClick() {
    this.currentlevel--;
    this.lastLevel = null;
    this.selectedLevel = this.items.slice();
  }

  private findParent(item: MenuItem) {}
}
