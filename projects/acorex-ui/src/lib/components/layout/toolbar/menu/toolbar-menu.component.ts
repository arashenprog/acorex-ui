import {
  Component,
  Input,
  EventEmitter,
  Output,
  ElementRef,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  NgZone,
  ViewChild,
  ChangeDetectorRef
} from '@angular/core';
import { AXToolbarItem } from '../toolbar-item';
import { MenuItem } from '../../../../core/menu.class';
import { Observable } from 'rxjs';
import { distinctUntilChanged, debounceTime } from "rxjs/operators";
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
      window.addEventListener('resize', this.onResize.bind(this));
    });
  }

  @ViewChild("container")
  private container: ElementRef<HTMLElement>;
  @ViewChild("root")
  private root: ElementRef<HTMLElement>;
  @ViewChild("moreUL")
  private moreUL: ElementRef<HTMLElement>;

  resizeChangeObserver: any;

  @Output()
  itemClick: EventEmitter<MenuItem> = new EventEmitter<MenuItem>();

  @Input()
  items: MenuItem[] = [];

  onItemClick(e: MouseEvent, item?: MenuItem) {
    if (item && !item.items && !item.disable) {
      this.itemClick.emit(item);
    }
    let li = (e.target as HTMLElement).closest("li");
    let ul = li.querySelector("ul");
    this.closeOnOut(li);
    if (ul) {
      let r: boolean = false;
      if (ul.classList.contains("collapsed")) {
        if (li.parentNode==this.root.nativeElement)
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

  private onResize(e: UIEvent) {
    this.closeOnOut();
    if (!this.resizeChangeObserver) {
      Observable.create(observer => {
        this.resizeChangeObserver = observer;
      })
        .pipe(debounceTime(300))
        .pipe(distinctUntilChanged())
        .subscribe(c => {
          this.applyResponsive();
        });
    }

    this.resizeChangeObserver.next(e);

  }

  applyResponsive() {
    let containerEl = this.container.nativeElement;
    let ulEl = this.root.nativeElement;
    let moreEl = this.moreUL.nativeElement;

    let liArray = [].slice.call(ulEl.querySelectorAll("li")).filter(c => !c.classList.contains("more") && c.parentNode === ulEl).reverse() as Array<HTMLLIElement>;
    //ulEl.querySelector<HTMLLIElement>(".more").style.display = "none";
    if (containerEl.clientWidth < ulEl.scrollWidth) {
      ulEl.querySelector<HTMLLIElement>(".more").style.display = "";
      let space = ulEl.scrollWidth - containerEl.clientWidth + 200;
      let sum = 0;
      liArray.forEach(li => {
        sum += li.clientWidth;
        if (sum < space) {
          moreEl.appendChild(li);
        }
      });
    }

  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.applyResponsive();
    }, 100);
  }

  ngOnDestroy(): void {
    this.zone.runOutsideAngular(() => {
      window.document.removeEventListener('click', this.clickOutside);
      window.removeEventListener('resize', this.onResize);
    });
  }

}
