import { Component, OnInit, Input, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
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
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFilterColumnSelectionComponent extends AXFilterColumnComponent {


    selectedItems: any[] = [];

    @Input()
    items: CheckItem[] = [];

    @Input()
    mode = "single";

    constructor(protected cdr: ChangeDetectorRef) {
        super(cdr);
    }

    get condition(): AXFilterCondition {
        let values = this.selectedItems.map(c => c.value);
        if (values.length == 0)
            return null;
        return {
            condition: this.mode == "single" ? "equal" : "contains",
            field: this.field,
            dataType: this.dataType,
            value: this.mode == "single" ? values[0] : values
        }
    }
    clear() {
        this.selectedItems = [];
        super.clear();
    }


    setFilter(value: any, operator: string) {
        debugger;
        if (value instanceof Array) {
            this.selectedItems = this.items.filter(c => value.some(z => z == c.value));
        }
        else {
            this.selectedItems = [this.items.find(c => c.value == value)];
        }
        super.setFilter(value, operator);
    }
}
