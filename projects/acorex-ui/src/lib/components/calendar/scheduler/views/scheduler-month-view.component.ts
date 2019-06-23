import { Component, OnInit,  Input, ElementRef } from '@angular/core';

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

    weekDays: any[] = ['Sunday','Moday','Tuesday','Wednesday','Thursday','Friday','Saturday']

    times: any[] = []

    private container: HTMLElement;
    private view: HTMLElement;
    private header: HTMLElement;
    private body: HTMLElement;

    ngOnInit(): void {
        let startDate = new Date();
        for (let i = 0; i < 5; i++) {
            this.times.push(('0' + i).slice(-2) + ":00");
        }
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
}
