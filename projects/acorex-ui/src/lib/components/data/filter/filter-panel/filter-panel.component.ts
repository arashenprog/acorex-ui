import { Component, OnInit, Input, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { AXFilterColumnGroup, AXFilterColumnComponent, AXFilterCondition } from '../filter.class';
import { MenuItem } from '../../../../core/menu.class';

@Component({
    selector: 'ax-filter-panel',
    templateUrl: './filter-panel.component.html',
    styleUrls: ['./filter-panel.component.scss']
})
export class AXFilterPanelComponent implements OnInit {


    @ViewChildren(AXFilterColumnComponent) filters: QueryList<AXFilterColumnComponent>;

    // modeItems: MenuItem[] = [
    //     {
    //         icon: "fas fa-filter",
    //         name: "simple",
    //         text: "Simple",
    //         selected:true,
    //         groupName: "mode",

    //     },
    //     {
    //         icon: "fas fa-filter",
    //         name: "advance",
    //         text: "Advance",
    //         groupName: "mode",
    //     }
    // ]

    modeItems: MenuItem[] = [
        {
            icon: "fas fa-filter",
            style: "ax-btn-primary",
            name: "apply",
            text: "Apply",

        },
        {
            name: "reset",
            text: "Reset"
        }
    ]

    @Input()
    groups: AXFilterColumnGroup[] = [];

    constructor() { }

    ngOnInit(): void { }


    onItemClick(e: MenuItem) {
        if (e.name == "apply") {
            let con: any[] = [];
            this.filters.forEach(e => {
                if (e.active) {
                    con.push(e.condition);
                    con.push("AND");
                }
            });
            con.pop();
            console.log(con);
        }
        if (e.name == "reset") {
            this.filters.forEach(e => {
                e.clear();
            });
        }
    }
}
