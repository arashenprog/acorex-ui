import { Component, ElementRef } from '@angular/core';
import { AXDateTime } from '../../../../core/calendar/datetime';
import { AXSchedulerBaseViewComponent } from './scheduler-view.component';

@Component({
    selector: 'ax-scheduler-month-view',
    templateUrl: './scheduler-month-view.component.html',
    providers: [{ provide: AXSchedulerBaseViewComponent, useExisting: AXSchedulerMonthViewComponent }]
})
export class AXSchedulerMonthViewComponent extends AXSchedulerBaseViewComponent {

    constructor(private elm: ElementRef<HTMLDivElement>) {
        super();
    }



    weekDays: any[] = ['Sunday', 'Moday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    startDayOfWeek = "Moday";


    days: any[] = []

    private container: HTMLElement;
    private view: HTMLElement;
    private header: HTMLElement;
    private body: HTMLElement;

    ngOnInit(): void {
        this.navigate();
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

    updateSize(): void {
        let firstTr = this.body.querySelector('tr');
        let index = 0;
        this.header.querySelectorAll('th').forEach(c => {
            let td = firstTr.children.item(index++) as HTMLElement;
            td.style.width = `${c.offsetWidth}px`;
        })
        this.body.style.height = `calc(100% - ${this.header.clientHeight}px)`;
        if (this.container)
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

    navigate(date: AXDateTime = new AXDateTime()) {
        let start = date.month.startDate.firstDayOfWeek;
        let end = date.month.endDate.endDayOfWeek;
        let dur = end.duration(start);
        for (let i = 0; i < dur; i++) {
            this.days.push(start.addDay(i));
        }
        let dayInWeek = 7;
        let rows = Math.floor(dur / dayInWeek);
        this.days = this.matrixify(this.days, rows, dayInWeek);
    }

}
