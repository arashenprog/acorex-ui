
import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { AXToolbarItem } from '../../../layout/toolbar/toolbar-item';
import { MenuItem } from '../../../../core/menu.class';
import { AXToolbarMenuComponent } from '../../../layout/toolbar/menu/toolbar-menu.component';


@Component({
    selector: 'ax-toolbar-scheduler-navigator',
    template: `<ax-toolbar-menu [items]="items"  (itemClick)="onItemClick($event)"></ax-toolbar-menu>`,
    providers: [{ provide: AXToolbarItem, useExisting: AXToolbarSchedulerNavigatorComponent }],
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class AXToolbarSchedulerNavigatorComponent {
    constructor(private cdr:ChangeDetectorRef) { }

    @ViewChild(AXToolbarMenuComponent)
    toolbar:AXToolbarMenuComponent;


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
    onNavigate: EventEmitter<"next" | "back"> = new EventEmitter<"next" | "back">();

    onItemClick(e: MenuItem) {
        this.onNavigate.emit(<any>e.name);
    }

    setDisplay(text: string) {
        this.items[2].text = text;
        this.toolbar.update();
    }

}
