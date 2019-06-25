
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AXToolbarItem } from '../../../layout/toolbar/toolbar-item';
import { MenuItem } from '../../../../core/menu.class';


@Component({
    selector: 'ax-toolbar-scheduler-navigator',
    template: `
        <ax-toolbar-menu [items]="items"  (itemClick)="onItemClick($event)"></ax-toolbar-menu>
    `,
    providers: [{ provide: AXToolbarItem, useExisting: AXToolbarSchedulerNavigatorComponent }]
})
export class AXToolbarSchedulerNavigatorComponent {
    constructor() { }


    items: MenuItem[] = [];

    ngAfterViewInit(): void {
        this.items = [
            {
                name: "prev",
                text: "Prev",
            },
            {
                name: "next",
                text: "Next",
            }]
    }


    @Output()
    onNavigate: EventEmitter<"next" | "back"> = new EventEmitter<"next" | "back">();

    onItemClick(e: MenuItem) {
        this.onNavigate.emit(<any>e.name);
    }

}
