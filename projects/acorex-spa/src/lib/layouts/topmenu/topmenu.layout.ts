import { Component, OnInit, Inject } from "@angular/core";
import { BaseMenuItem, AXTabPageService } from "acorex-ui";
import { AXHeaderBarMenuService } from "../shared/api";

@Component({
  selector: "top-menu",
  templateUrl: "./topmenu.layout.html",
  styleUrls: ["./topmenu.layout.scss"]
})
export class AXTopMenuLayoutComponent {
    
  constructor(public tabService: AXTabPageService,public headerBarMenuService:AXHeaderBarMenuService , @Inject("startUpTab") private startUpTab: any) {

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
  }
  onHeaderClick(e: BaseMenuItem) {
    this.headerBarMenuService.clickItem(e).then(c => {});
  }
  onMouseWheel(e) {
    let delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
    document.getElementsByClassName("tabs")[0].scrollLeft -= (delta * 40);
  }

}
