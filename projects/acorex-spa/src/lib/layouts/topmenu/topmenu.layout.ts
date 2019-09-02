import { Component, OnInit, Inject, ViewEncapsulation, ViewChild, ElementRef } from "@angular/core";
import { BaseMenuItem, MenuItem, AXTabPageService } from "acorex-ui";
import { AXHeaderBarMenuService, AXNavMenuService } from "../shared/api";

@Component({
  selector: "top-menu",
  templateUrl: "./topmenu.layout.html",
  styleUrls: ["./topmenu.layout.scss"],
  encapsulation: ViewEncapsulation.None
})
export class AXTopMenuLayoutComponent {
  hasToolbar: boolean = false;
  headerItems: BaseMenuItem[]=[];
  navMenuItems: MenuItem[] = [];

  @ViewChild('topMenuWrapper')
  topMenuWrapper: ElementRef<HTMLElement>;

  @ViewChild('header')
  header: ElementRef<HTMLElement>;

  constructor(
    public tabService: AXTabPageService,
    public headerBarMenuService: AXHeaderBarMenuService,
    private navMenuService: AXNavMenuService
  ) { }


  ngAfterViewInit() {
    this.applySize();
  }


  applySize() {
    this.topMenuWrapper.nativeElement.style.height = `calc(100% - ${this.header.nativeElement.clientHeight}px)`
  }

  

  ngOnInit(): void {
    this.headerBarMenuService.getItems().then(c => {
      this.headerItems = c;
    });
    this.navMenuService.getItems().then((all: MenuItem[]) => {
      this.navMenuItems = all.filter(c => c.parentId == null).slice(); //.map(c => {  this.transformMenus(c, all); });
      this.navMenuItems.forEach(i => {
        this.transformMenus(i, all.slice());
      });
    });
  }

  private transformMenus(item: MenuItem, items: MenuItem[]) {
    item.items = items.filter(c => c.parentId == item.id);
    item.items.forEach(i => {
      this.transformMenus(i, items.slice());
    });
    return item;
  }

  onHeaderClick(e: BaseMenuItem) {
    this.headerBarMenuService.clickItem(e).then(c => { });
  }

  onItemClick(e: MenuItem) {
    this.navMenuService.clickItem(e).then(c => {
      //
    });
  }
}
