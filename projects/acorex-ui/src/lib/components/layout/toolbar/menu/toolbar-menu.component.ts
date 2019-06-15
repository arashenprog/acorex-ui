import {
  Component,
  Input,
  EventEmitter,
  Output,
  ElementRef,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  NgZone
} from '@angular/core';
import { AXToolbarItem } from '../toolbar-item';
import { MenuItem } from '../../../../core/menu.class';
declare var $: any;

@Component({
  selector: "ax-toolbar-menu",
  templateUrl: "./toolbar-menu.component.html",
  styleUrls: ["./toolbar-menu.component.scss"],
  providers: [{ provide: AXToolbarItem, useExisting: AXToolbarMenuComponent }],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXToolbarMenuComponent extends AXToolbarItem {
  constructor(private element: ElementRef, private zone: NgZone) {
    super();
    zone.runOutsideAngular(c => {
      window.document.addEventListener('click', this.clickOutside.bind(this));
    });
  }

  @Input()
  items: MenuItem[] = [];

  onItemClick(e: MouseEvent, item: MenuItem) {
    let el = (e.target as HTMLElement);
    let ul = el.querySelector("ul");
    this.closeOnOut(el);
    if (ul) {
      if (ul.classList.contains("collapsed")) {
        if (!item.parentId)
          ul.classList.add("first");
        ul.classList.remove("collapsed");
        let pos = el.getBoundingClientRect();
        let top = 0;
        let left = 0;
        if (!ul.classList.contains("first")) {
          top = (pos.top);
          left = pos.left + el.clientWidth;
        }
        else {
          left = pos.left;
          top = (pos.top + el.clientHeight);
        }
        ul.style.top = top + "px";
        ul.style.left = left + "px";
      }
      else {
        ul.classList.add("collapsed");
        ul.querySelectorAll("ul").forEach(c => c.classList.add("collapsed"));
      }
    }
    e.stopPropagation();
  }

  private closeOnOut(el?: HTMLElement) {
    let root = this.element.nativeElement as HTMLElement;
    root.querySelectorAll("ul.sub-menu").forEach(c => {
      if (!c.contains(el))
        c.classList.add("collapsed");
    });
  }

  private clickOutside() {
    this.closeOnOut();
  }

}
