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
  constructor(private element: ElementRef) {
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
    let el = (event.target as HTMLElement).querySelector('ul');
    if (el) {
      if (el.classList.contains('active')) {
        el.classList.remove('active');
        el.querySelectorAll('.active').forEach(c => c.classList.remove('active'))

      }
      else {
        el.classList.add('active')
      }
    }

    document.addEventListener('click',()=>{
      el.classList.remove('active');
      el.querySelectorAll('.active').forEach(c => c.classList.remove('active'))
    })
    event.stopPropagation();
  }


  @HostListener('document:click')
  bodyClick() {
    this.element.nativeElement.querySelectorAll('active').forEach(c => c.classList.remove('active'))
  }

}
