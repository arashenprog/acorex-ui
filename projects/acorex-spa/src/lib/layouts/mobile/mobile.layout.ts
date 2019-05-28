import { Component, OnInit, ViewEncapsulation, Inject } from "@angular/core";
import { AXTabPageService, MenuItem } from "acorex-ui";
import { AXNavMenuService } from "../shared/services/nav-menu.service";

@Component({
  selector: "mobile-layout",
  templateUrl: "./mobile.layout.html",
  styleUrls: ["./mobile.layout.scss"],
  encapsulation: ViewEncapsulation.None
})
export class AXMobileLayoutComponent implements OnInit {
  showDrawerMenu: boolean = false;
  navMenuItems: MenuItem[] = [];

  constructor(
    public tabService: AXTabPageService,
    private navMenuService: AXNavMenuService,
    @Inject("startUpTab") private startUpTab: any
  ) {}

  ngOnInit(): void {
    this.navMenuService.getItems().then(c => {
      this.navMenuItems = c.filter(c => c.parentId == null);
    });
  }
  ngAfterViewInit() {
    if (this.startUpTab) {
      this.tabService.open(this.startUpTab);
    }
    this.pageSizeControl();
  }


  openDrawerMenu() {
    this.showDrawerMenu = !this.showDrawerMenu;
  }
  onItemClick(e: MenuItem) {
    this.navMenuService.clickItem(e);
    this.showDrawerMenu = false;

  }
  //fix top menu space
  pageSizeControl() {}
}
