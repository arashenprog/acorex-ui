import { Component, OnInit, Input, ElementRef, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { AXSchedulerBaseViewComponent } from '../scheduler-view.component';
import { AXDateTime, AXDateTimeRange } from '../../../../../core/calendar/datetime';
import { AXSchedulerSlot } from '../../scheduler.class';

@Component({
    templateUrl: './scheduler-timeline-view.component.html',
    styleUrls:['./scheduler-timeline-view.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [{ provide: AXSchedulerBaseViewComponent, useExisting: AXSchedulerTimelineViewComponent }]
})
export class AXSchedulerTimelineViewComponent extends AXSchedulerBaseViewComponent {
    constructor(private elm: ElementRef<HTMLDivElement>, private cdr: ChangeDetectorRef) { super(); }




    times: any[] = []

    //private hScroll: HTMLElement;
    private vScroll: HTMLElement;
    private container: HTMLElement;
    private view: HTMLElement;
    private header: HTMLElement;
    private body: HTMLElement;

    ngOnInit(): void {
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


    updateSize(): void {
        // let firstTr = this.body.querySelector('tr');
        // if (firstTr) {
        //     let index = 0;
        //     this.header.querySelectorAll('th').forEach(c => {
        //         let td = firstTr.children.item(index++) as HTMLElement;
        //         td.style.width = `${c.offsetWidth}px`;
        //     })
        //     this.vScroll.style.height = `calc(100% - ${this.header.clientHeight}px)`;
        //     //this.vScroll.style.width = `${this.hScroll.clientWidth + this.hScroll.scrollLeft}px`;
        //     if (this.container)
        //         this.view.style.height = `${this.container.clientHeight}px`;
        // }
    }

    navigate(date: AXDateTime = new AXDateTime()) {
        this.navigatorDate = date;
        this.times=[];
        this.slots = [];
        for (let i = 0; i < this.interval; i++) {
            let d = date.addDay(i);
            let range = new AXDateTimeRange(d, d);
            let slot: AXSchedulerSlot = {
                range: range,
                events: this.getEvents(range, "day")
            }
            this.slots.push(slot);
        }
        for (let i = 0; i < 24; i++) {
            this.times.push({
                display:('0' + i).slice(-2) + ":00",
                value:i
            });
        }
        this.cdr.detectChanges();
    }

    next(): void {
        this.navigate(this.navigatorDate.addDay(this.interval));
    }
    prev(): void {
        this.navigate(this.navigatorDate.addDay(-this.interval));
    }

    arrangeEvents()
    {
        
    }
}
