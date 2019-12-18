import { Component, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { AXFilterCondition, AXFilterColumnComponent } from '../filter.class';
import { AXDateTime } from '../../../../core/calendar/datetime';
import { AXSelectionListComponent } from '../../../form/selection-list/selection-list.component';

@Component({
    selector: 'ax-filter-column-date',
    template: `
        <div class="ax-filter-section">
            <ax-selection-list [items]="items"  mode="single"  direction="vertical" (selectedItemsChange)="onSelectedChanged($event)">
            </ax-selection-list>
        </div>
        <div class="ax-filter-section-value" [hidden]="!showCustom">
            <ax-date-picker label="From" [(value)]="fromDate" (onDateChange)="dateChange($event)"></ax-date-picker>
            <ax-date-picker label="To" [(value)]="toDate" (onDateChange)="dateChange($event)"></ax-date-picker>
        </div>
        <div class="ax-filter-section-value" [hidden]="!showSpecific">
            <ax-date-picker label="Date" [(value)]="fromDate" (onDateChange)="dateChange($event)"></ax-date-picker>            
        </div>
        
    `,
    providers: [
        { provide: AXFilterColumnComponent, useExisting: AXFilterColumnDateComponent }
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFilterColumnDateComponent extends AXFilterColumnComponent {



    @ViewChild(AXSelectionListComponent, { static: true }) selection: AXSelectionListComponent;

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
            text: "Specific",
            value: "specific"
        },
        {
            text: "Range",
            value: "range"
        }
    ];

    fromDate: AXDateTime = new AXDateTime();
    toDate: AXDateTime = new AXDateTime();

    selectedItem: any = null;

    showCustom: boolean = false;
    showSpecific: boolean = false;

    constructor(protected cdr: ChangeDetectorRef) {
        super(cdr);
    }

    ngAfterViewInit(): void {
        this.selection.selectedItems = [this.items[0]];
    }
    dateChange(e) {
        this.valueChange.emit(e);

    }
    onSelectedChanged(items: any[]) {
        this.selectedItem = items[0];
        this.showCustom = this.selectedItem && this.selectedItem.value == "range";
        this.showSpecific = this.selectedItem && this.selectedItem.value == "specific";
        this.cdr.markForCheck();
    }

    get condition(): AXFilterCondition {
        let today = new AXDateTime();
        switch (this.selectedItem.value) {
            case "today":
                this.fromDate = this.toDate = today;
                return {
                    condition: "equal",
                    field: this.field,
                    dataType: "date",
                    value: this.fromDate.toISOString()
                }
            case "specific":
                return {
                    condition: "equal",
                    field: this.field,
                    dataType: "date",
                    value: this.fromDate.toISOString()
                }
            case "this-week":
                this.toDate = today.endOf("week");
                this.fromDate = today.startOf("week");
                break;
            case "this-month":
                this.toDate = today.endOf("month")
                this.fromDate = today.startOf("month");
                break;
            case "this-year":
                this.toDate = today.endOf("year")
                this.fromDate = today.startOf("year");
                break;
        }

        return {
            condition: "between",
            field: this.field,
            dataType: "date",
            value: [this.fromDate.toISOString(), this.toDate.toISOString()]
        }
    }
}
