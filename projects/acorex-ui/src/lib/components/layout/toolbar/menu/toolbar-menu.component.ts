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
  QueryList,
  Host,
  HostListener
} from '@angular/core';
import { AXToolbarItem } from '../toolbar-item';
import { MenuItem } from '../../../../core/menu.class';

@Component({
  selector: 'ax-toolbar-menu',
  templateUrl: './toolbar-menu.component.html',
  styleUrls: ['./toolbar-menu.component.scss'],
  providers: [{ provide: AXToolbarItem, useExisting: AXToolbarMenuComponent }],
  encapsulation: ViewEncapsulation.None
})
export class AXToolbarMenuComponent extends AXToolbarItem {
  constructor(private element: ElementRef) {
    super();
  }
  showResponsiveMenu = false;

  @ViewChildren('NavItem') NavItem: QueryList<AXToolbarMenuComponent>;
  @Input()
  items: MenuItem[] = [];

  @Output()
  itemClick: EventEmitter<MenuItem> = new EventEmitter<MenuItem>();
  cumulativeOffset(element) {
    let top = 0;
    let left = 0;
    do {
      top += element.offsetTop || 0;
      left += element.offsetLeft || 0;
      element = element.offsetParent;
    } while (element);

    return {
      top: top,
      left: left
    };
  };
  // fix this fucking event \o/
  onToolbarItemClick(item: MenuItem, event) {
    if (!(item.items && item.items.length)) {
      this.itemClick.emit(item);
    }

    const el = (event.target as HTMLElement).querySelector('ul');


    if (el) {
      if (el.classList.contains('active')) {
        el.classList.remove('active');
        el.querySelectorAll('.active').forEach(c =>
          c.classList.remove('active')
        );
      } else {
        el.classList.add('active');
      }
    }

    document.addEventListener('click', () => {
      el.classList.remove('active');
      el.querySelectorAll('.active').forEach(c => c.classList.remove('active'));

    });
    event.stopPropagation();
  }

  @HostListener('document:click')
  bodyClick() {
    this.element.nativeElement
      .querySelectorAll('active')
      .forEach(c => c.classList.remove('active'));

  }
  onResponsiveMenuButtonClick() {
    this.showResponsiveMenu = !this.showResponsiveMenu;
  }
}
