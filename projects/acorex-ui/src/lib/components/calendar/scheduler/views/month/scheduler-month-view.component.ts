import { Component, ElementRef, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { AXDateTime, AXDateTimeRange } from '../../../../../core/calendar/datetime';
import { AXSchedulerBaseViewComponent, AXSchedulerEventChangeArgs, AXSchedulerSlot } from '../scheduler-view.component';
import { AXSchedulerEvent } from '../../scheduler.model';

@Component({
    templateUrl: './scheduler-month-view.component.html',
    styleUrls: ['./scheduler-month-view.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [{ provide: AXSchedulerBaseViewComponent, useExisting: AXSchedulerMonthViewComponent }]
})
export class AXSchedulerMonthViewComponent extends AXSchedulerBaseViewComponent {


    constructor(private elm: ElementRef<HTMLDivElement>, private cdr: ChangeDetectorRef) {
        super();
    }



    weekDays: any[] = [
        {
            index: 0, title: 'Sunday'
        },
        {
            index: 1, title: 'Moday'
        },
        {
            index: 2, title: 'Tuesday'
        },
        {
            index: 3, title: 'Wednesday'
        },
        {
            index: 4, title: 'Thursday'
        },
        {
            index: 5, title: 'Friday'
        },
        {
            index: 6, title: 'Saturday'
        }]
    startDayOfWeek = "Moday";



    private container: HTMLElement;
    private view: HTMLElement;
    private header: HTMLElement;
    private body: HTMLElement;



    ngAfterViewInit(): void {
        this.header = this.elm.nativeElement.querySelector<HTMLElement>(".header");
        this.body = this.elm.nativeElement.querySelector<HTMLElement>(".body");
        this.view = this.elm.nativeElement.querySelector<HTMLElement>(".view");
        this.container = this.elm.nativeElement.closest(".view-container") as HTMLElement;

    }


    updateSize(): void {
        let firstTr = this.body.querySelector('tr');
        if (firstTr) {
            let index = 0;
            this.header.querySelectorAll('th').forEach(c => {
                let td = firstTr.children.item(index++) as HTMLElement;
                td.style.width = `${c.offsetWidth}px`;
            })
            this.body.style.height = `calc(100% - ${this.header.clientHeight}px)`;
            if (this.container)
                this.view.style.height = `${this.container.clientHeight}px`;
        }
        this.arrangeEvents();
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
        this.navigatorDate = date;
        let start = date.month.startDate.firstDayOfWeek;
        let end = date.month.endDate.endDayOfWeek;
        let dur = end.duration(start);
        this.slots = [];
        for (let i = 0; i < dur; i++) {
            let d = start.addDay(i);
            let range: AXDateTimeRange = new AXDateTimeRange(d, d);
            this.slots.push({
                range: range,
                events: this.getEvents(range, "day"),
                uid: range.startTime.date.getTime().toString()
            });
        }
        let dayInWeek = 7;
        let rows = Math.floor(dur / dayInWeek);
        this.slots = this.matrixify(this.slots, rows, dayInWeek);
        this.cdr.detectChanges();
    }


    next(): void {
        this.navigate(this.navigatorDate.addMonth(this.interval));
    }
    prev(): void {
        this.navigate(this.navigatorDate.addMonth(-this.interval));
    }

    arrangeEvents() {
        (<any>this.slots).forEach(r => {
            r.forEach((slot: AXSchedulerSlot) => {
                let slotTd = this.elm.nativeElement.querySelector<HTMLElement>("[data-uid='" + slot.uid + "']");
                let viewMoreDiv = slotTd.querySelector<HTMLElement>('.view-more');
                let viewMore = 0;
                viewMoreDiv.style.display = "none";
                let width = slotTd.offsetWidth;
                slot.events.forEach(event => {
                    let e = slotTd.querySelector<HTMLElement>("[data-uid='" + event.uid + "']");
                    if (e) {
                        e.style.visibility = "unset";
                        e.style.width = ((event.range.duration() + 1) * width) + "px";
                        e.style.top = ((this.findEventIndex(event)) * 25) + "px";
                        if (e.getBoundingClientRect().bottom >= slotTd.getBoundingClientRect().bottom) {
                            viewMore++;
                            e.style.visibility = "hidden";
                            viewMoreDiv.style.display = "unset";
                            viewMoreDiv.innerHTML = `+${viewMore} more`;
                        }
                    }
                })
            });
        });
    }

    findEventIndex(event: AXSchedulerEvent): number {
        let a = this.events.filter(c =>
            c.range.startTime.equal(event.range.startTime, "days")
        ).sort((d1, d2) => {
            let v = d1.range.startTime.compaire(d2.range.startTime, "minute");
            return v;
        });
        //console.log(this.events,a);
        return a.indexOf(event);
    }

    onDragDrop(e) {
        let el = e.item.element.nativeElement as HTMLElement;
        if (e.previousContainer !== e.container) {
            el.style.opacity = "0";
            let r: AXSchedulerEventChangeArgs = new AXSchedulerEventChangeArgs();
            r.event = e.item.data;
            r.oldSlot = e.previousContainer.data;
            r.newSlot = e.container.data;
            //
            r.onComplete.subscribe((er: AXSchedulerEventChangeArgs) => {
                el.style.opacity = "1";
                if (!er.canceled) {
                    debugger;
                    let slotTime = er.newSlot.range.startTime.startOf();
                    let z = er.event.range.startTime.clone();
                    let dur = slotTime.duration(z.startOf(), "day");
                    console.log("event");
                    console.log(z);
                    console.log("slot");
                    console.log(slotTime);
                    console.log("before");
                    console.log(er.event.range.startTime.clone());
                    console.log(er.event.range.endTime.clone());
                    er.event.range.startTime = er.event.range.startTime.add("day", dur);
                    er.event.range.endTime = er.event.range.endTime.add("day", dur);
                    console.log("duration", dur);
                    console.log("after");
                    console.log(er.event.range.startTime.clone());
                    console.log(er.event.range.endTime.clone());

                    er.oldSlot.events = er.oldSlot.events.filter(c => c.uid != er.event.uid);
                    er.newSlot.events.push(er.event);
                }
            })
            this.onEventChanged.emit(r);
        }
    }


}
