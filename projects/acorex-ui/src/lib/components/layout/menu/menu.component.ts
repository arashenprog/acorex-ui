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
  ChangeDetectorRef,
  TemplateRef,
  ContentChild
} from "@angular/core";
import { MenuItem } from "../../../core/menu.class";
import { Observable } from "rxjs";
import { distinctUntilChanged, debounceTime } from "rxjs/operators";
import { AXHtmlUtil } from "../../../core/utils/html/html-util";

@Component({
  selector: "ax-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXMenuComponent {
  constructor(
    private element: ElementRef,
    private zone: NgZone,
    private cdr: ChangeDetectorRef
  ) {
    zone.runOutsideAngular(() => {
      window.document.addEventListener("click", this.clickOutsideHandler.bind(this));
      window.addEventListener("resize", this.onResize.bind(this));
    });
  }

  @ViewChild("container")
  private container: ElementRef<HTMLElement>;
  @ViewChild("root")
  private root: ElementRef<HTMLElement>;
  @ViewChild("moreUL")
  private moreUL: ElementRef<HTMLElement>;
  @ViewChild("moreLI")
  private moreLI: ElementRef<HTMLElement>;


  @Input()
  @ContentChild(TemplateRef)
  menuTemplate: TemplateRef<any>;

  resizeChangeObserver: any;

  @Output()
  itemClick: EventEmitter<MenuItem> = new EventEmitter<MenuItem>();

  @Input()
  public selection: "none" | "single" | "multiple" = "none";

  @Input()
  public target: string;

  public currentTarget: HTMLElement;

  @Input()
  public direction: "vertical" | "horizontal" = "horizontal";

  private _items: MenuItem[];
  @Input()
  public get items(): MenuItem[] {
    return this._items;
  }
  public set items(v: MenuItem[]) {
    this._items = v;
    this.fixItemMap(this._items);
    this.update();
  }

  private fixItemMap(items: MenuItem[]) {
    items.forEach(item => {
      (<any>item).hasChildren = item.items && (item.items.length > 0);
      item.uid = AXHtmlUtil.getUID();
      if (item.items)
        this.fixItemMap(item.items);
    })
  }

  onItemClick(e: MouseEvent, item?: MenuItem) {
    e.stopPropagation();
    if (item && (!item.items || !item.items.length) && !item.disable) {
      this.setSelection(item);
      this.itemClick.emit(item);
      this.closeOnOut();
      return;
    }
    this.zone.runOutsideAngular(() => {
      let li = (e.target as HTMLElement).closest("li");
      let ul = li.querySelector("ul");
      this.closeOnOut(li);
      if (ul) {
        let r: boolean = false;
        if (ul.classList.contains("collapsed")) {
          if (li.parentNode == this.root.nativeElement)
            ul.classList.add("first");

          ul.classList.remove("collapsed");
          let posLi = li.getBoundingClientRect();
          let y = 0;
          let x = 0;
          if (!ul.classList.contains("first")) {
            y = posLi.top;
            x = posLi.left + li.clientWidth;
          } else {
            if (this.direction == "horizontal") {
              x = posLi.left;
              y = posLi.top + li.clientHeight;
            }
            else {
              x = posLi.right;
              y = posLi.top;
            }
          }

          if (
            x + ul.clientWidth > window.innerWidth ||
            (ul.parentElement.closest("ul.sub-menu") &&
              ul.parentElement
                .closest("ul.sub-menu")
                .classList.contains("revert"))
          ) {
            let parentPost = ul.parentElement.getBoundingClientRect();
            if (ul.classList.contains("first"))
              x = window.innerWidth - parentPost.right;
            else
              x =
                window.innerWidth -
                parentPost.right +
                ul.parentElement.clientWidth;

            r = true;
            ul.classList.add("revert");
          }

          ul.style.top = y + "px";
          if (r) ul.style.right = x + "px";
          else ul.style.left = x + "px";
        } else {
        }
      }
    });

  }

  public close(): void {
    this.closeOnOut();
  }

  private closeOnOut(el?: HTMLElement) {
    this.zone.runOutsideAngular(() => {
      let root = this.element.nativeElement as HTMLElement;
      if (this.target && !el) {
        this.container.nativeElement.style.visibility = "hidden";
      }
      root.querySelectorAll("ul.sub-menu").forEach(c => {
        if (!c.contains(el)) c.classList.add("collapsed");
      });

    });
  }

  private clickOutsideHandler(e: MouseEvent) {
    if (
      !this.element.nativeElement.contains(e.target)
    ) {
      this.closeOnOut();
    }
  }

  private setSelection(item: MenuItem) {
    if (item.groupName) {
      if (this.selection == "multiple") {
        item.selected = !item.selected;
      }
      if (this.selection == "single") {
        item.selected = true;
        this.unSelect(item, this.items);
      }
      this.update();
    }
  }

  private unSelect(item: MenuItem, items: MenuItem[]) {
    this.zone.runOutsideAngular(() => {
      items.forEach(i => {
        if (i.groupName == item.groupName && i.name != item.name) {
          i.selected = false;
        }
        if (i.items) this.unSelect(item, i.items);
      });
    });
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
    setTimeout(() => {
      let containerEl = this.container.nativeElement;
      let rootEl = this.root.nativeElement;
      let moreUiEl = this.moreUL.nativeElement;
      let moreLiEl = this.moreLI.nativeElement;
      this.zone.runOutsideAngular(() => {
        let liArray = [].slice
          .call(rootEl.querySelectorAll("li"))
          .filter(c => !c.classList.contains("more") && c.parentNode === rootEl)
          .reverse() as Array<HTMLLIElement>;
        rootEl.querySelector<HTMLLIElement>(".more").style.display = "none";
        let diff = Math.abs(rootEl.scrollWidth - containerEl.clientWidth);
        if (containerEl.clientWidth < rootEl.scrollWidth) {
          rootEl.querySelector<HTMLLIElement>(".more").style.display = "";
          let space = diff + 300;
          let sum = 0;
          liArray.forEach(li => {
            sum += li.clientWidth;
            if (sum < space) {
              li.setAttribute("data-width", li.clientWidth.toString());
              moreUiEl.prepend(li);
            }
          });
        } else if (moreUiEl.querySelectorAll("li").length) {
          let liArray = [].slice
            .call(moreUiEl.querySelectorAll("li"))
            .filter(c => c.parentNode === moreUiEl) as Array<HTMLLIElement>;
          let sum = 0;
          liArray.forEach(li => {
            sum += Number(li.getAttribute("data-width"));
            if (sum + rootEl.scrollWidth > containerEl.clientWidth) {
              rootEl.insertBefore(li, moreLiEl);
            }
          });
        }
      });
    }, 50);
  }

  ngAfterViewInit(): void {
    this.cdr.detach();
    ;
    this.applyResponsive();
    this.applyContextMenu();
  }

  applyContextMenu() {
    if (this.target) {
      this.zone.runOutsideAngular(() => {
        ;
        let root = this.container.nativeElement as HTMLElement;
        if (!root.classList.contains("contextMenu"))
          root.classList.add("contextMenu");
        document.querySelectorAll(this.target).forEach(t => {
          t.removeEventListener("contextmenu", this.onContextHandler.bind(this, t));
          t.addEventListener("contextmenu", this.onContextHandler.bind(this, t));
        });
      });
    }
  }

  private onContextHandler(target: HTMLElement, e: MouseEvent) {
    console.log(target);
    let root = this.container.nativeElement as HTMLElement;
    this.currentTarget = target;
    e.preventDefault();
    e.stopPropagation();
    this.closeOnOut();
    root.style.top = `${e.pageY}px`;
    root.style.left = `${e.pageX}px`;
    root.style.visibility = "unset";
  }

  ngOnDestroy(): void {
    this.zone.runOutsideAngular(() => {
      window.document.removeEventListener("click", this.clickOutsideHandler.bind(this));
      window.removeEventListener("resize", this.onResize);
      document.querySelectorAll(this.target).forEach(t => {
        t.removeEventListener("contextmenu", this.onContextHandler.bind(this));
      });
    });
  }

  update() {
    this.cdr.markForCheck();
    this.cdr.detectChanges();
    this.applyContextMenu();
  }

  trackByItem(index: number, item: MenuItem) {
    return item.uid;
  }
}
