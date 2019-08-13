import { Component } from '@angular/core';
import { AXFilterCondition, AXFilterColumnComponent } from '../filter.class';
import { AXDateTime } from '../../../../core/calendar/datetime';

@Component({
    selector: 'ax-filter-column-date',
    template: `
        <div class="ax-filter-section">
            <ax-selection-list [items]="items" [(selectedItems)]="selectedItems" mode="single" direction="vertical" (selectedItemsChange)="onSelectedChanged($event)">
            </ax-selection-list>
        </div>
        <div class="ax-filter-section" [hidden]="!showCustom">
            <ax-date-picker label="From" [(value)]="fromDate"></ax-date-picker>
            <ax-date-picker label="To" [(value)]="toDate"></ax-date-picker>
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

    fromDate: AXDateTime;
    toDate: AXDateTime;

    selectedItems: any[] = [];

    showCustom: boolean = false;

    constructor() {
        super();
    }

    ngAfterViewInit(): void {
        this.selectedItems.push(this.items[0]);
    }

    onSelectedChanged(items: any[]) {
        debugger;
        this.showCustom = items[0] && items[0].value == "custom";
    }

    get condition(): AXFilterCondition {
        let selectedItem = this.selectedItems[0];
        switch (selectedItem.value) {
            case "today":
                this.fromDate = this.toDate = new AXDateTime();
                break;
            case "this-week":
                this.toDate = new AXDateTime();
                this.fromDate = this.toDate.startOf("week");
                break;
            case "this-month":
                this.toDate = new AXDateTime();
                this.fromDate = this.toDate.startOf("month");
                break;
            case "this-year":
                this.toDate = new AXDateTime();
                this.fromDate = this.toDate.startOf("year");
                break;
        }

        return {
            condition: "between",
            field: this.field,
            value: [this.fromDate.date, this.toDate.date]
        }
    }

    clear() {
        this.selectedItems = [];
        this.value = null;
    }

}
