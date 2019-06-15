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
    zone.runOutsideAngular(() => {
      window.document.addEventListener('click', this.clickOutside.bind(this));
    });
  }

  @Output()
  itemClick: EventEmitter<MenuItem> = new EventEmitter<MenuItem>();

  @Input()
  items: MenuItem[] = [];

  onItemClick(e: MouseEvent, item: MenuItem) {
    if (!item.items && !item.disable) {
      this.itemClick.emit(item);
    }
    let li = (e.target as HTMLElement).closest("li");
    let ul = li.querySelector("ul");
    this.closeOnOut(li);
    if (ul) {
      let r: boolean = false;
      if (ul.classList.contains("collapsed")) {
        if (!item.parentId)
          ul.classList.add("first");
        ul.classList.remove("collapsed");
        let posLi = li.getBoundingClientRect();
        let y = 0;
        let x = 0;
        if (!ul.classList.contains("first")) {
          y = (posLi.top);
          x = posLi.left + li.clientWidth;
        }
        else {
          x = posLi.left;
          y = (posLi.top + li.clientHeight);
        }

        if (x + ul.clientWidth > window.innerWidth ||
          (ul.parentElement.closest("ul.sub-menu") && ul.parentElement.closest("ul.sub-menu").classList.contains('revert'))
        ) {
          let parentPost = ul.parentElement.getBoundingClientRect();
          if (ul.classList.contains('first'))
            x = window.innerWidth - (parentPost.right);
          else
            x = window.innerWidth - (parentPost.right) + ul.parentElement.clientWidth;

          r = true;
          ul.classList.add('revert');
        }

        ul.style.top = y + "px";
        if (r)
          ul.style.right = x + "px";
        else
          ul.style.left = x + "px";
      }
      else {

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
