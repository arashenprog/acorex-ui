import { Component, AfterViewInit } from '@angular/core';


import * as moment from "jalali-moment";
import { AXWidgetComponent, registerWidget } from '../../api';


@Component({
    templateUrl: "./date.widget.html",
    styleUrls: ["./date.widget.scss"]
})
export class AXDateWidgetComponent extends AXWidgetComponent implements AfterViewInit {

    time: string;
    dayNum: string;
    dayText: string;
    monthText: string;
    yearNum: string;


    constructor() {
        super();
        this.type = "teal";
        this.showTitle = false;
    }

    ngAfterViewInit(): void {
        this.setText();
    }

    setText(): void {
        this.isLoading = false;
        let date: Date = new Date();
        let mom = moment(date.toLocaleString()).locale('fa');
        this.time = mom.format('hh:mm');
        this.dayNum = mom.format('DD');
        this.monthText = mom.format('MMMM');
        this.dayText = mom.format('dddd');
        this.yearNum = mom.format('YYYY');
        setTimeout(() => {
            this.setText();
        }, 10000);
    }

    ngOnDestroy(): void {

    }
}


registerWidget({
    type: AXDateWidgetComponent,
    title: "Date"
});