import { Component, OnInit, Input, ViewChild, ViewChildren, QueryList, ViewEncapsulation, ChangeDetectionStrategy, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { AXFilterColumnGroup, AXFilterColumnComponent, AXFilterCondition, AXFilterColumn } from '../filter.class';
import { MenuItem } from '../../../../core/menu.class';

@Component({
    selector: 'ax-filter-panel',
    templateUrl: './filter-panel.component.html',
    styleUrls: ['./filter-panel.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFilterPanelComponent {


    @ViewChildren(AXFilterColumnComponent) filters: QueryList<AXFilterColumnComponent>;

    @Input()
    groups: AXFilterColumnGroup[] = [];


    @Output()
    filterChange: EventEmitter<AXFilterCondition[]> = new EventEmitter<AXFilterCondition[]>();

    constructor(private cdr: ChangeDetectorRef) { }

    onItemClick(e) {
        if (e) {
            this.generateFilter();
        }
        else {
            this.clear();
            this.generateFilter();
        }
    }

    public clear() {
        this.filters.forEach(e => {
            e.clear();
        });
    }

    private generateFilter() {
        let con: AXFilterCondition[] = [];
        this.filters.forEach(e => {
            if (e.active && e.condition) {
                con.push(e.condition);
            }
        });
        this.filterChange.emit(con);
    }

    public load(filters: AXFilterCondition[]): void {
        filters.forEach(f => {
            let col = this.filters.find(c => c.field == f.field);
            if (col)
                col.setFilter(f.value, f.condition);
        });
        this.generateFilter();
    }
}
