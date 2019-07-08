
import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { AXToolbarItem } from '../../../layout/toolbar/toolbar-item';
import { MenuItem } from '../../../../core/menu.class';
import { AXToolbarMenuComponent } from '../../../layout/toolbar/menu/toolbar-menu.component';
import { AXPopoverComponent } from '../../../layout/popover/popover.component';
import { AXDateTime, AXDateTimeRange } from "../../../../core/calendar/datetime";


@Component({
    selector: 'ax-toolbar-scheduler-navigator',
    template: `
    <div #nav>
        <ax-toolbar-menu [items]="items"  (itemClick)="onItemClick($event)"></ax-toolbar-menu>
        <ax-popover target="#nav" placement="bottom-end" alignment="top-end" #pop>
            <ax-calendar-box (onChanged)="onDateChange($event)"></ax-calendar-box>
        </ax-popover>
    </div>      
    `,
    providers: [{ provide: AXToolbarItem, useExisting: AXToolbarSchedulerNavigatorComponent }],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXToolbarSchedulerNavigatorComponent {
    constructor(private cdr: ChangeDetectorRef) { }

    @ViewChild(AXToolbarMenuComponent)
    toolbar: AXToolbarMenuComponent;

    @ViewChild('pop')
    pop: AXPopoverComponent;


    items: MenuItem[] = [];

    ngAfterViewInit(): void {
        this.items = [
            {
                name: "prev",
                icon: "fas fa-angle-left",
                tooltip: "Prev"
            },
            {
                name: "next",
                icon: "fas fa-angle-right",
                tooltip: "Next"
            },
            {
                name: "current",

            }]
    }


    @Output()
    onNavigate: EventEmitter<"next" | "back" | AXDateTime> = new EventEmitter<"next" | "back" | AXDateTime>();

    onItemClick(e: MenuItem) {
        if (e.name == "current")
            this.pop.toggle();
        else
            this.onNavigate.emit(<any>e.name);
    }

    setDisplay(text: string) {
        this.items[2].text = text;
        this.toolbar.update();
    }


    onDateChange(e: AXDateTime) {
        this.onNavigate.emit(e);
        this.pop.close();
    }

}
