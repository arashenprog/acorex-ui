import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AXFilterCondition, AXFilterColumn, AXFilterColumnComponent } from '../filter.class';
import { CheckItem, BaseMenuItem } from '../../../../core/menu.class';
import { AXSelectionListComponent } from '../../../form/selection-list/selection-list.component';

@Component({
    selector: 'ax-filter-column-selection',
    template: `
        <div class="ax-filter-section">
           <ax-selection-list  [items]="items" [mode]="mode" direction="vertical" [(selectedItems)]="selectedItems">
           </ax-selection-list>
        </div>
    `,
    providers: [
        { provide: AXFilterColumnComponent, useExisting: AXFilterColumnSelectionComponent }
    ]
})
export class AXFilterColumnSelectionComponent extends AXFilterColumnComponent {


    selectedItems:any[] = [];

    @Input()
    items: CheckItem[] = [];

    @Input()
    mode = "single";

    constructor() {
        super();
    }

    get condition(): AXFilterCondition {
        debugger
        let values = this.selectedItems.map(c=>c.value);
        return {
            condition: this.mode == "single" ? "equal" : "contains",
            field: this.field,
            value: this.mode == "single" ? values[0] : values
        }
    }
    clear(){
        this.field = "";
        this.selectedItems = [];
        this.value = null;
        this.active = false;
    }

}
