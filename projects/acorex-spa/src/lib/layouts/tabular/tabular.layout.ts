import { Component, ViewEncapsulation, Inject } from "@angular/core";
import { BaseMenuItem } from 'acorex-ui';
import { AXHeaderBarMenuService } from '../shared/services/header-bar-menu-service';



@Component({
    selector: 'master-layout',
    templateUrl: './tabular.layout.html',
    styleUrls: ["./tabular.layout.scss"],
    encapsulation: ViewEncapsulation.None
})
export class AXTabularLayoutComponent  {
    sidebarShow: boolean = true;

    headerItems: BaseMenuItem[];

    constructor(
      private headerBarMenuService: AXHeaderBarMenuService,
    ) {}
  
    ngAfterViewInit(): void {
        //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
        //Add 'implements AfterViewInit' to the class.
      this.headerBarMenuService.getItems().then(c => {
        this.headerItems = c;
      });
  
      let sidebar = document.getElementById("ax-side-menu");
      let header = document.getElementById("header-content");
      if (sidebar.classList.contains("d-none")) {
        header.style.width = window.innerWidth + "px";
      } else {
        header.style.width = window.innerWidth - sidebar.offsetWidth + "px";
      }
    }

    onFullClick() {
      let side = document.getElementsByTagName("ax-side-menu");
      let sidebar = document.getElementById("ax-side-menu");
      let header = document.getElementById("header-content");
      if (side) {
        sidebar.classList.toggle("d-none");
      }
      if (sidebar.classList.contains("d-none")) {
        header.style.width = window.innerWidth + "px";
      } else {
        header.style.width = window.innerWidth - sidebar.offsetWidth + "px";
      }
    }
   
  
    onHeaderClick(e: BaseMenuItem) {
      this.headerBarMenuService.clickItem(e).then(c => {});
    }
    onMouseWheel(e) {
      let delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
      document.getElementsByClassName("tabs")[0].scrollLeft -= (delta * 40);
    }
    
}