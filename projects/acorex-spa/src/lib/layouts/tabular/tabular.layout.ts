import { Component, AfterViewInit } from "@angular/core";
import { PageTabService } from 'acorex-ui';



@Component({
    selector: 'master-layout',
    templateUrl: './tabular.layout.html',
    styleUrls:["./tabular.layout.scss"]
})
export class TabularLayoutComponent implements AfterViewInit {
    sidebarShow: boolean = true;

    constructor(private tabService: PageTabService) {
     
    }

    ngDoCheck() {
    }

    ngAfterViewInit() {

        // this.tabService.open({
        //     content: DashboardPage,
        //     title: "داشبورد",
        //     closable: false
        // });
    }
}