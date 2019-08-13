import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AXFilterCondition, AXFilterColumn, AXFilterColumnComponent } from '../filter.class';
import { CheckItem, BaseMenuItem } from '../../../../core/menu.class';
import { AXDateTime } from '../../../../core/calendar/datetime';

@Component({
    selector: 'ax-filter-column-date',
    template: `
        <div class="ax-filter-section">
            <ax-selection-list [items]="items" [(selectedItems)]="selectedItems" mode="single" direction="vertical" (selectedItemsChanged)="onSelectedChanged($event)">
            </ax-selection-list>
        </div>
        <div class="ax-filter-section" [hidden]="!showCustom">
            <ax-date-picker label="From"></ax-date-picker>
            <ax-date-picker label="To"></ax-date-picker>
        </div>
    `,
    providers: [
        { provide: AXFilterColumnComponent, useExisting: AXFilterColumnDateComponent }
    ]
})
export class AXFilterColumnDateComponent extends AXFilterColumnComponent {



    items: any = [
        {
            text: "Today",
            value: "today"
        },
        {
            text: "This Week",
            value: "this-week"
        },
        {
            text: "This Month",
            value: "this-month"
        },
        {
            text: "This Year",
            value: "this-year"
        },
        {
            text: "Custom",
            value: "custom"
        }
    ];

    selectedItems: any[] = [];

    showCustom: boolean = false;

    constructor() {
        super();
    }

    ngAfterViewInit(): void {
        this.selectedItems.push(this.items[0]);
    }

    onSelectedChanged(items: any[]) {
        this.showCustom = items[0] && items[0].value == "custom";
    }

    get condition(): AXFilterCondition {
        let values = this.items.filter(c => c.selected).map(c => c.value);
        return {
            condition: "between",
            field: this.field,
            value: [new AXDateTime(), new AXDateTime().addDay(10)]
        }
    }

    clear(){
        this.selectedItems = [];
        this.value = null;
        this.items = [];
    }

}
