import { Component, OnInit, Input, ElementRef } from '@angular/core';
import * as moment_ from "jalali-moment";
const moment = moment_;

@Component({
    selector: 'ax-scheduler-month-view',
    templateUrl: './scheduler-month-view.component.html'
})
export class AXSchedulerMonthViewComponent implements OnInit {
    constructor(private elm: ElementRef<HTMLDivElement>) { }

    @Input()
    timeSlot: number = 1;


    @Input()
    interval: number = 1;

    weekDays: any[] = ['Sunday', 'Moday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    startDayOfWeek = "Moday";
    startDate = new Date();

    v = moment().startOf("month").format("jMM");

    days: any[] = []

    private container: HTMLElement;
    private view: HTMLElement;
    private header: HTMLElement;
    private body: HTMLElement;

    ngOnInit(): void {
        debugger;
        let md = moment(this.startDate);
        let startDayInMonth = md.startOf("month").weekday();
        let start = md.subtract(startDayInMonth + 1, 'days');
        for (let i = 0; i < 35; i++) {
            start.add(1, 'days');
            this.days.push(start.toDate());
        }
        this.days = this.matrixify(this.days, 5, 7);
    }

    ngAfterViewInit(): void {
        this.header = this.elm.nativeElement.querySelector<HTMLElement>(".header");
        this.body = this.elm.nativeElement.querySelector<HTMLElement>(".body");
        this.view = this.elm.nativeElement.querySelector<HTMLElement>(".view");
        this.container = this.elm.nativeElement.closest(".view-container") as HTMLElement;
    }

    ngAfterViewChecked(): void {
        this.updateSize();
    }

    private updateSize() {
        let firstTr = this.body.querySelector('tr');
        let index = 0;
        this.header.querySelectorAll('th').forEach(c => {
            let td = firstTr.children.item(index++) as HTMLElement;
            td.style.width = `${c.offsetWidth}px`;
        })
        this.body.style.height = `calc(100% - ${this.header.clientHeight}px)`;
        this.view.style.height = `${this.container.clientHeight}px`;
    }

    matrixify(arr, rows, cols) {
        let matrix = [];
        if (rows * cols === arr.length) {
            for (let i = 0; i < arr.length; i += cols) {
                matrix.push(arr.slice(i, cols + i));
            }
        }
        return matrix;
    };

}
