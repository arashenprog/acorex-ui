import { Component, OnInit, Input, ElementRef, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { AXDateTime, AXDateTimeRange } from '../../../../../core/calendar/datetime';
import { AXSchedulerBaseViewComponent } from '../scheduler-view.component';
import { AXSchedulerSlot, AXSchedulerEvent } from '../../scheduler.class';

@Component({
    templateUrl: './scheduler-daytime-view.component.html',
    styleUrls:['./scheduler-daytime-view.component.scss'],
    encapsulation:ViewEncapsulation.None,
    providers: [{ provide: AXSchedulerBaseViewComponent, useExisting: AXSchedulerDayTimeViewComponent }]
})
export class AXSchedulerDayTimeViewComponent extends AXSchedulerBaseViewComponent {
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
        let firstTr = this.body.querySelector('tr');
        if (firstTr) {
            let index = 0;
            this.header.querySelectorAll('th').forEach(c => {
                let td = firstTr.children.item(index++) as HTMLElement;
                td.style.width = `${c.offsetWidth}px`;
            })
            this.vScroll.style.height = `calc(100% - ${this.header.clientHeight}px)`;
            //this.vScroll.style.width = `${this.hScroll.clientWidth + this.hScroll.scrollLeft}px`;
            if (this.container)
                this.view.style.height = `${this.container.clientHeight}px`;
        }
        this.arrangeEvents();
    }

    navigate(date: AXDateTime = new AXDateTime()) {
      
        this.times = [];
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
                display: ('0' + i).slice(-2) + ":00",
                value: i
            });
        }
        this.navigatorDate = date;
        this.cdr.detectChanges();
    }

    next(): void {
        this.navigate(this.navigatorDate.addDay(this.interval));
    }
    prev(): void {
        this.navigate(this.navigatorDate.addDay(-this.interval));
    }

    arrangeEvents() {
        let events = this.elm.nativeElement.querySelectorAll<HTMLElement>('.event');
        if (events.length) {
            let height = events[0].closest('td').offsetHeight;
            events.forEach(e => {
                let uid = e.attributes.getNamedItem("data-uid").value;
                let event = this.events.find(c => c.uid == uid);
                let dur = Math.ceil(Math.abs(event.range.duration("hours")));
                let total = dur + 1;
                if (event.range.startTime.hour + total > 23)
                    total = 24 - event.range.startTime.hour;
                e.style.height = (total * height) + "px";
            })
        }
    }

    findEventIndex(event: AXSchedulerEvent): number {
        let a = this.events.filter(c =>
            c.range.startTime.equal(event.range.startTime, "day")
        ).sort((d1, d2) => {
            return d1.range.startTime.compaire(d2.range.startTime);
        });

        return a.indexOf(event);
    }
}
