import { Component, ElementRef, ChangeDetectorRef, ViewEncapsulation, HostListener, NgZone } from '@angular/core';
import { AXDateTime, AXDateTimeRange } from '../../../../../core/calendar/datetime';
import { AXSchedulerBaseViewComponent } from '../scheduler-view.component';
import { AXSchedulerEvent, AXSchedulerEventChangeArgs } from '../../scheduler.class';

@Component({
    templateUrl: './scheduler-month-view.component.html',
    styleUrls: ['./scheduler-month-view.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [{ provide: AXSchedulerBaseViewComponent, useExisting: AXSchedulerMonthViewComponent }]
})
export class AXSchedulerMonthViewComponent extends AXSchedulerBaseViewComponent {


    constructor(
        private elm: ElementRef<HTMLDivElement>,
        private zone: NgZone,
        private cdr: ChangeDetectorRef) {
        super();
    }

    @HostListener('wheel', ['$event'])
    onKeydownHandler(e: MouseWheelEvent) {
        if (e.deltaY > 0) {
            this.navigate(this.navigatorDate.addMonth(1))
        }
        else if (e.deltaY < 0) {
            this.navigate(this.navigatorDate.addMonth(-1))
        }
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

    matrixSlots: any;

    navigate(date: AXDateTime = new AXDateTime()) {

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
        this.matrixSlots = this.matrixify(this.slots, rows, dayInWeek);
        this.navigatorDate = date;
        this.cdr.detectChanges();
    }


    next(): void {
        this.navigate(this.navigatorDate.addMonth(this.interval));
    }
    prev(): void {
        this.navigate(this.navigatorDate.addMonth(-this.interval));
    }

    arrangeEvents() {
        this.slots.forEach(slot => {
            let slotTd = this.elm.nativeElement.querySelector<HTMLElement>("[data-uid='" + slot.uid + "']");
            let viewMoreDiv = slotTd.querySelector<HTMLElement>('.view-more');
            let viewMore = 0;
            viewMoreDiv.style.display = "none";
            let width = slotTd.offsetWidth;
            slot.events.forEach(event => {
                let e = slotTd.querySelector<HTMLElement>("[data-uid='" + event.uid + "']");
                if (e) {
                    let dur = Math.ceil(Math.abs(event.range.duration()));
                    e.style.visibility = "unset";
                    e.style.width = (dur * width) + "px";
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
    }

    findEventIndex(event: AXSchedulerEvent): number {
        let a = this.events.filter(c =>
            c.range.startTime.equal(event.range.startTime, "days")
        ).sort((d1, d2) => {
            let v = d1.range.startTime.compaire(d2.range.startTime, "minute");
            return v;
        });
        return a.indexOf(event);
    }

    private dragEnterSlot: HTMLElement;
    private dragPreview: HTMLElement;
    private dragHour: number = null;
    onDragStarted(event) {
        this.zone.runOutsideAngular(() => {
            this.dragEnterSlot = event.source.dropContainer.element.nativeElement;
            this.elm.nativeElement.addEventListener("mousemove", this.drageMouseMove.bind(this));
        })
    }
    onDragEntered(event) {
        this.dragPreview = document.querySelector<HTMLElement>('.cdk-drag-preview');
        this.dragEnterSlot = event.container.element.nativeElement;
    }
    onDragEnded(event) {
        this.dragEnterSlot = null;
        this.dragPreview = null;
        this.zone.runOutsideAngular(() => {
            this.elm.nativeElement.removeEventListener("mousemove", this.drageMouseMove.bind(this));
        })
    }

    private drageMouseMove(e: MouseEvent) {
        this.zone.runOutsideAngular(() => {
            if (!this.dragPreview)
                this.dragPreview = document.querySelector<HTMLElement>('.cdk-drag-preview');
            if (this.dragEnterSlot && this.dragPreview) {
                let diff = this.dragPreview.getBoundingClientRect().top - this.dragEnterSlot.getBoundingClientRect().top;
                let hour = Math.round((diff / this.dragEnterSlot.getBoundingClientRect().height) * 24);
                this.dragPreview.querySelector('.ax-sch-str').innerHTML = `${hour > 0 ? hour : 0}:00`;
                this.dragHour = hour;
            }
        });
    }

    onDragDropOnDay(e) {
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
                    let slotTime = er.newSlot.range.startTime.startOf();
                    let z = er.event.range.startTime.clone();
                    let durDay = slotTime.duration(z.startOf(), "days");
                    er.event.range.startTime = er.event.range.startTime.add("day", durDay);
                    if (this.dragHour != null)
                    {
                        er.event.range.startTime.set("hour", this.dragHour);
                        er.event.range.startTime.set("minute", 0);
                    }
                    er.event.range.endTime = er.event.range.endTime.add("day", durDay);
                    er.oldSlot.events = er.oldSlot.events.filter(c => c.uid != er.event.uid);
                    er.newSlot.events.push(er.event);
                }
            })
            this.onEventChanged.emit(r);
        }
        
    }

}
