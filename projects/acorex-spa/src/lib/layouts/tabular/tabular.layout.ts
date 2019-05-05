import { Component, AfterViewInit } from "@angular/core";


declare function initialTheme(): void;

@Component({
    selector: 'master-layout',
    templateUrl: './master.layout.html',
    styleUrls:["./tabular.layout.scss"]
})
export class TabularLayoutComponent implements AfterViewInit {
    sidebarShow: boolean = true;

    // constructor(
    //     private tabService: PageTabService,
    //     private translateService: TranslateService,
    //     private activatedRoute: ActivatedRoute) {
    //     this.activatedRoute.queryParams.subscribe(params => {
    //         const lang = params['lang'];
    //         this.translateService.setLang(lang);
    //     });
    // }

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