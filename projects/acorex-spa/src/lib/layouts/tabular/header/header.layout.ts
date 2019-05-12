import { Component, OnInit, AfterViewInit, DoCheck } from "@angular/core";
import { AXTabPageService } from 'acorex-ui';
import { AXHeaderBarMenuService } from '../../shared/api';
import { BaseMenuItem } from 'acorex-ui';



@Component({
    selector: 'ax-header-layout',
    templateUrl: './header.layout.html',
})
export class AXHeaderComponent implements OnInit, DoCheck {

    fullWidth: boolean = true;

    headerItems: BaseMenuItem[];

    constructor(public tabService: AXTabPageService, private headerBarMenuService: AXHeaderBarMenuService) {

    }

    ngOnInit(): void {
        this.headerBarMenuService.getItems().then(c => {
            this.headerItems = c;
        });

        let sidebar = document.getElementById("ax-side-menu")
        let header = document.getElementById("header-content")
        if (sidebar.classList.contains("d-none")) {
            header.style.width = window.innerWidth + "px";
        }
        else {
            header.style.width = window.innerWidth - sidebar.offsetWidth + "px";
        }
    }
    ngDoCheck(): void {
        let sidebar = document.getElementById("ax-side-menu")
        let header = document.getElementById("header-content")
        if (sidebar.classList.contains("d-none")) {
            header.style.width = window.innerWidth + "px";
        }
        else {
            header.style.width = window.innerWidth - sidebar.offsetWidth + "px";
        }

    }
    onFullClick() {
        let side = document.getElementsByTagName("ax-side-menu");
        let sidebar = document.getElementById("ax-side-menu");
        let header = document.getElementById("header-content");
        if (side) {
            sidebar.classList.toggle("d-none")
        }
        if (sidebar.classList.contains("d-none")) {
            header.style.width = window.innerWidth + "px";
        }
        else {
            header.style.width = window.innerWidth - sidebar.offsetWidth + "px";
        }
    }
    mouseWheelUp(e) {
        console.log(e)
    }

    onHeaderClick(e:BaseMenuItem)
    {
        this.headerBarMenuService.clickItem(e).then(c=>{
        });
    }
    // fullScreen(e) {
    //     let body = document.getElementsByTagName("body")
    //     body[0].requestFullscreen()
    //     if (document.fullscreenEnabled) {
    //         document.exitFullscreen()
    //     }

    // }
    // config(e) {
    //     // this.tabService.open({ content: SettingPage, title: "تنظیمات" });
    // }

}