import { Component, AfterViewInit, ViewEncapsulation, Inject } from "@angular/core";
import { AXTabPageService } from 'acorex-ui';



@Component({
    selector: 'master-layout',
    templateUrl: './tabular.layout.html',
    styleUrls: ["./tabular.layout.scss"],
    encapsulation: ViewEncapsulation.None
})
export class AXTabularLayoutComponent implements AfterViewInit {
    sidebarShow: boolean = true;

    constructor(private tabService: AXTabPageService, @Inject("startUpTab") private startUpTab: any) {

    }

    ngDoCheck() {
    }

    ngAfterViewInit() {
        debugger;
        if (this.startUpTab)
            this.tabService.open(this.startUpTab);
    }
}