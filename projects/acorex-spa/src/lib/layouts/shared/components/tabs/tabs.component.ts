import { Component, OnInit, Inject, ViewEncapsulation, ViewChild } from "@angular/core";
import { AXTabPageService, MenuItem, AXMenuComponent } from "acorex-ui";
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: "ax-tabs",
  templateUrl: "./tabs.component.html",
  styleUrls: ["./tabs.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class AXLayoutTabsComponent implements OnInit {

  @ViewChild(AXMenuComponent, { static: true }) menu: AXMenuComponent;

  
  constructor(
    public tabService: AXTabPageService,
    @Inject("startUpTab") private startUpTab: any
  ) {
    this.tabService.opened=(t) => {
      setTimeout(() => {
        this.menu.applyContextMenu();
      }, 50);
    };
    this.tabService.closed=(t) => {
      setTimeout(() => {
        this.menu.applyContextMenu();
      }, 50);
    };
  }

  ngOnInit(): void { }

  ngAfterViewInit() {
    if (this.startUpTab) {
      this.tabService.open(this.startUpTab);
    }
  }

  onTabClick(tab, e: MouseEvent) {
    if (e.which == 2)
      this.tabService.close(tab, {});
    else
      this.tabService.active(tab);
  }

  dragDrop(event: CdkDragDrop<any[]>) {
    let tab = this.tabService.tabs[event.previousIndex];
    moveItemInArray(this.tabService.tabs, event.previousIndex, event.currentIndex);
    if (tab)
      this.tabService.active(tab);
  }


  tabMenuItems: MenuItem[] = [
    {
      name: "close",
      icon: "fas",
      text: "Close tab"
    },
    {
      name: "closeOthers",
      icon: "fas",
      text: "Close other tabs"
    },
    {
      name: "openInNew",
      icon: "fas fa-external-link-alt",
      text: "Open in new window"
    },
    {
      name: "maximize",
      icon: "fas fa-window-maximize",
      text: "Maximize"
    }
  ]

  onContextItemClick(e: MenuItem) {
    let target = this.menu.currentTarget as HTMLElement;
    let tabId = Number(target.getAttribute("data-tab-id"));
    let tab = this.tabService.tabs.find(t => t.id == tabId);
    if (e.name == "close") {
      this.tabService.close(tab, {});
    }
    if (e.name == "closeOthers") {
      this.tabService.tabs.filter(c => c.id != tabId).forEach(t => {
        this.tabService.close(t, {});
      });
    }
    if (e.name == "openInNew") {
      if (tab.data && tab.data.route) {
        window.open("/" + tab.data.route, "_blank"); 
      }
    }
    if (e.name == "maximize") {
    }
  }
}
