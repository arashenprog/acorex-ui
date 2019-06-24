import { Component, OnInit, Input, ElementRef } from '@angular/core';
import * as moment_ from "jalali-moment";
import { AXDateTime } from '../../../../core/calendar/datetime';
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


    days: any[] = []

    private container: HTMLElement;
    private view: HTMLElement;
    private header: HTMLElement;
    private body: HTMLElement;

    ngOnInit(): void {
        debugger;
        let current= new AXDateTime(this.startDate);
        let start = current.month.startDate.firstDayOfWeek;
        let end = current.month.endDate.endDayOfWeek;
        let dur = end.duration(start);
        for (let i = 0; i < dur; i++) {
            this.days.push(start.addDay(i));
        }
        let dayInWeek = 7;
        let rows = Math.floor(dur / dayInWeek);
        this.days = this.matrixify(this.days, rows, dayInWeek);
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
