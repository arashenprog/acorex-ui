import { Component, OnInit, Inject, ViewEncapsulation } from "@angular/core";
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
  constructor(
    public tabService: AXTabPageService,
    public headerBarMenuService: AXHeaderBarMenuService,
    private navMenuService: AXNavMenuService,
    @Inject("startUpTab") private startUpTab: any) {

  }

  ngDoCheck() {
  }

  ngAfterViewInit() {
    if (this.startUpTab)
      this.tabService.open(this.startUpTab);
  }

  headerItems: BaseMenuItem[];

  ngOnInit(): void {
    this.headerBarMenuService.getItems().then(c => {
      this.headerItems = c;
    });
    this.navMenuService.getItems().then(all => {

      this.navMenuItems = all.filter(c => c.parentId == null); //.map(c => {  this.transformMenus(c, all); });
      this.navMenuItems.forEach(i => {
        this.transformMenus(i, all);
      })
    });

  }

  private transformMenus(item: MenuItem, items: MenuItem[]) {
    item.items = items.filter(c => c.parentId == item.id);
    return item;
  }

  onHeaderClick(e: BaseMenuItem) {
    this.headerBarMenuService.clickItem(e).then(c => { });
  }
  onMouseWheel(e) {
    let delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
    document.getElementsByClassName("tabs")[0].scrollLeft -= (delta * 40);
  }


  navMenuItems: MenuItem[] = [{

  }];


  onItemClick(e: MenuItem) {
    this.navMenuService.clickItem(e);
  }
}