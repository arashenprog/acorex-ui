import { Component, OnInit, ViewEncapsulation, Inject } from "@angular/core";
import {  AXTabPageService } from "acorex-ui";

@Component({
  selector: "mobile-layout",
  templateUrl: "./mobile.layout.html",
  styleUrls: ["./mobile.layout.scss"],
  encapsulation: ViewEncapsulation.None
})
export class AXMobileLayoutComponent implements OnInit {
  showDrawerMenu: boolean = false;
  showDrawerTabs: boolean = false;

    
    constructor(public tabService: AXTabPageService, @Inject("startUpTab") private startUpTab: any) {}

  ngOnInit(): void {}
  ngAfterViewInit() {
    if (this.startUpTab)
      this.tabService.open(this.startUpTab);
  }

  openDrawerTabs() {
    this.showDrawerTabs = !this.showDrawerTabs;
    this.showDrawerMenu = false;
  }
  openDrawerMenu() {
    this.showDrawerMenu = !this.showDrawerMenu;
    this.showDrawerTabs = false;
  }
}
