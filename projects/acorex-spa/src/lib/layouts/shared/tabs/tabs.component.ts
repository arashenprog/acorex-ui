import { Component, OnInit, Inject, ViewEncapsulation } from "@angular/core";
import { AXTabPageService } from "../../../../../../acorex-ui/src/lib/components/nav/api";

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
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    if (this.startUpTab) this.tabService.open(this.startUpTab);
  }
  onMouseWheel(e) {
    let delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
    document.getElementsByTagName("ax-tabs")[0].scrollLeft -= delta * 40;
  }
}
