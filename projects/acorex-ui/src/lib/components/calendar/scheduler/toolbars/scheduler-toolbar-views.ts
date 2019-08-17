import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { AXToolbarItem } from '../../../layout/toolbar/toolbar-item';
import { MenuItem } from '../../../../core/menu.class';
import { AXToolbarMenuComponent } from '../../../layout/toolbar/menu/toolbar-menu.component';



@Component({
    selector: 'ax-toolbar-scheduler-view',
    template: `
        <ax-toolbar-menu [items]="items" selection="single" (itemClick)="onItemClick($event)"></ax-toolbar-menu>
    `,
    providers: [{ provide: AXToolbarItem, useExisting: AXToolbarSchedulerViewsComponent }]
})
export class AXToolbarSchedulerViewsComponent {
    constructor() { }

    @ViewChild(AXToolbarMenuComponent) menu: AXToolbarMenuComponent;
    items: MenuItem[] = [];

    update(): void {
        this.menu.update();
    }

    @Output()
    onViewChanged: EventEmitter<string> = new EventEmitter<string>();

    onItemClick(e: MenuItem) {
        this.onViewChanged.emit(e.name);
    }

}
