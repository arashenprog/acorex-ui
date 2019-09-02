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

  @ViewChild(AXMenuComponent) menu: AXMenuComponent;
  constructor(
    public tabService: AXTabPageService,
    @Inject("startUpTab") private startUpTab: any
  ) {
    this.tabService.opened.subscribe(t => {
      setTimeout(() => {
        this.menu.applyContextMenu();
      }, 50);
    });
    this.tabService.closed.subscribe(t => {
      setTimeout(() => {
        this.menu.applyContextMenu();
      }, 50);
    });
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
      icon:"fas fa-times",
      text: "Close tab"
    },
    {
      name: "openInNew",
      icon:"fas fa-external-link-alt",
      text: "Open in new browser tab"
    },
    {
      name: "maximize",
      icon:"fas fa-window-maximize",
      text: "Maximize"
    }
  ]

  onContextItemClick(e:MenuItem)
  {
    console.log(this.menu.currentTarget);
  }
}
