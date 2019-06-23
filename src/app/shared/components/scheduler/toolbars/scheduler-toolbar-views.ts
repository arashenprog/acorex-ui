import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AXToolbarItem, MenuItem } from 'acorex-ui';



@Component({
    selector: 'ax-toolbar-scheduler-view',
    template: `
        <ax-toolbar-menu [items]="items" selection="single" (itemClick)="onItemClick($event)"></ax-toolbar-menu>
    `,
    providers: [{ provide: AXToolbarItem, useExisting: AXToolbarSchedulerViewsComponent }]
})
export class AXToolbarSchedulerViewsComponent {
    constructor() { }


    items: MenuItem[] = [];

    ngAfterViewInit(): void {
    }


    @Output()
    onViewChanged: EventEmitter<string> = new EventEmitter<string>();

    onItemClick(e: MenuItem) {
        this.onViewChanged.emit(e.name);
    }

}
