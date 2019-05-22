import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AXToolbarItem } from '../toolbar-item';
import { MenuItem } from '../../../../core/menu.class';


@Component({
  selector: 'ax-toolbar-menu',
  templateUrl: './toolbar-menu.component.html',
  styleUrls: ['./toolbar-menu.component.scss'],
  providers: [{ provide: AXToolbarItem, useExisting: AXToolbarMenuComponent }]
})
export class AXToolbarMenuComponent extends AXToolbarItem {

  constructor() { super(); }


  @Input()
  items: MenuItem[] = []


  @Output()
  itemClick: EventEmitter<MenuItem> = new EventEmitter<MenuItem>();

  ngAfterViewInit(): void {
  }

  onToolbarItemClick(item: MenuItem) {
    if (!(item.items && item.items.length)) {
      this.itemClick.emit(item);
    }

  }
}
