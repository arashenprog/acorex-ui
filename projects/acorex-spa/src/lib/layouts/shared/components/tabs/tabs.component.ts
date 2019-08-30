import { Component, OnInit, Inject, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef } from "@angular/core";
import { AXTabPageService } from "acorex-ui";
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: "ax-tabs",
  templateUrl: "./tabs.component.html",
  styleUrls: ["./tabs.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class AXLayoutTabsComponent implements OnInit {
  constructor(
    public tabService: AXTabPageService,
    @Inject("startUpTab") private startUpTab: any
  ) {
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
    debugger;
    let tab = this.tabService.tabs[event.previousIndex];
    moveItemInArray(this.tabService.tabs, event.previousIndex, event.currentIndex);
    if (tab)
      this.tabService.active(tab);
  }
}
