import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AXFilterCondition, AXFilterColumn, AXFilterColumnComponent } from '../filter.class';
import { CheckItem, BaseMenuItem } from '../../../../core/menu.class';
import { AXDateTime } from '../../../../core/calendar/datetime';

@Component({
    selector: 'ax-filter-column-date',
    template: `
        <div class="ax-filter-section">
           <ax-selection-list [items]="items" mode="single" direction="vertical">
           </ax-selection-list>
        </div>
    `,
    providers: [
        { provide: AXFilterColumnComponent, useExisting: AXFilterColumnDateComponent }
    ]
})
export class AXFilterColumnDateComponent extends AXFilterColumnComponent {



    items: CheckItem[] = [
        {
            selected: true,
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



    constructor() {
        super();
    }

    get condition(): AXFilterCondition {
        let values = this.items.filter(c => c.selected).map(c => c.value);
        return {
            condition: "between",
            field: this.field,
            value: [new AXDateTime(), new AXDateTime().addDay(10)]
        }
    }

}
