import { Component, OnInit, Input, ViewChild, ViewChildren, QueryList, ViewEncapsulation, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { AXFilterColumnGroup, AXFilterColumnComponent, AXFilterCondition } from '../filter.class';
import { MenuItem } from '../../../../core/menu.class';

@Component({
    selector: 'ax-filter-panel',
    templateUrl: './filter-panel.component.html',
    styleUrls: ['./filter-panel.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class AXFilterPanelComponent  {


    @ViewChildren(AXFilterColumnComponent) filters: QueryList<AXFilterColumnComponent>;

    @Input()
    groups: AXFilterColumnGroup[] = [];


    @Output()
    filterChange:EventEmitter<any>=new EventEmitter();

    constructor() { }

    onItemClick(e) {
        if (e) {
            this.generateFilter();
            
        }
        else {
            this.clear();
        }
    }

    public clear() {
        this.groups.forEach(g => {
            g.columns.forEach(c => {
                c.active = false;
            });
        });
        this.filters.forEach(e => {
            e.clear();
        });
    }

    private generateFilter() {
        let con: any[] = [];
        this.filters.forEach(e => {
            if (e.active) {
                con.push(e.condition);
                con.push("AND");
            }
        });
        con.pop();
        this.filterChange.emit(con);
    }
}
