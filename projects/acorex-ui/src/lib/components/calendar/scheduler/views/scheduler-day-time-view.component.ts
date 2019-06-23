import { Component, OnInit,  Input, ElementRef } from '@angular/core';

@Component({
    selector: 'ax-scheduler-day-time-view',
    templateUrl: './scheduler-day-time-view.component.html'
})
export class AXSchedulerDayTimeViewComponent implements OnInit {
    constructor(private elm: ElementRef<HTMLDivElement>) { }

    @Input()
    timeSlot: number = 1;


    @Input()
    interval: number = 1;

    days: any[] = []

    times: any[] = []

    //private hScroll: HTMLElement;
    private vScroll: HTMLElement;
    private container: HTMLElement;
    private view: HTMLElement;
    private header: HTMLElement;
    private body: HTMLElement;

    ngOnInit(): void {
        let startDate = new Date();
        for (let i = 0; i < this.interval; i++) {
            this.days.push(startDate);
            startDate = new Date(startDate.setDate(startDate.getDate() + 1));
        }
        for (let i = 0; i < 24; i++) {
            this.times.push(('0' + i).slice(-2) + ":00");
        }
    }

    ngAfterViewInit(): void {
        this.vScroll = this.elm.nativeElement.querySelector<HTMLElement>(".v-scroll");
        //this.hScroll = this.elm.nativeElement.querySelector<HTMLElement>(".h-scroll");
        this.header = this.elm.nativeElement.querySelector<HTMLElement>(".header");
        this.body = this.elm.nativeElement.querySelector<HTMLElement>(".body");
        this.view = this.elm.nativeElement.querySelector<HTMLElement>(".view");
        this.container = this.elm.nativeElement.closest(".view-container") as HTMLElement;
        // this.hScroll.addEventListener("scroll", () => {
        //     this.updateSize();
        // });
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
        this.vScroll.style.height = `calc(100% - ${this.header.clientHeight}px)`;
        //this.vScroll.style.width = `${this.hScroll.clientWidth + this.hScroll.scrollLeft}px`;
        this.view.style.height = `${this.container.clientHeight}px`;
    }
}
