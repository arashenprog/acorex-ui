import { Component, OnInit, AfterViewInit, DoCheck } from "@angular/core";
import { PageTabService } from "acorex-ui";



@Component({
    selector: 'ax-header-layout',
    templateUrl: './header.layout.html',
})
export class HeaderLayout implements OnInit, DoCheck {

    fullWidth: boolean = true;

    constructor( public tabService: PageTabService) {
    }

    ngOnInit(): void {
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
    fullScreen(e) {
        let body = document.getElementById("body")
        body.requestFullscreen()
        if (document.fullscreenEnabled) {
            document.exitFullscreen()
        }

    }
    config(e) {
        // this.tabService.open({ content: SettingPage, title: "تنظیمات" });
    }

}