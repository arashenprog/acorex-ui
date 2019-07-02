
import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AXToolbarItem } from '../../../layout/toolbar/toolbar-item';
import { MenuItem } from '../../../../core/menu.class';


@Component({
    selector: 'ax-toolbar-scheduler-navigator',
    template: `
        <div>
            <ax-toolbar-menu [items]="items"  (itemClick)="onItemClick($event)"></ax-toolbar-menu>
            <div>
                {{display}}
            </div>
        </div>
    `,
    providers: [{ provide: AXToolbarItem, useExisting: AXToolbarSchedulerNavigatorComponent }],
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class AXToolbarSchedulerNavigatorComponent {
    constructor(private cdr:ChangeDetectorRef) { }


    items: MenuItem[] = [];
    display: string = "";

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
            }]
    }


    @Output()
    onNavigate: EventEmitter<"next" | "back"> = new EventEmitter<"next" | "back">();

    onItemClick(e: MenuItem) {
        this.onNavigate.emit(<any>e.name);
    }

    setDisplay(text: string) {
        this.display = text;
    }

}
