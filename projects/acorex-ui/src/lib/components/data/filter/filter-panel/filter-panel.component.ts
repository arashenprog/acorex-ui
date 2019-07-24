import { Component, OnInit, Input } from '@angular/core';
import { AXFilterColumnGroup } from '../filter.class';
import { MenuItem } from '../../../../core/menu.class';

@Component({
    selector: 'ax-filter-panel',
    templateUrl: './filter-panel.component.html',
    styleUrls: ['./filter-panel.component.scss']
})
export class AXFilterPanelComponent implements OnInit {

    modeItems: MenuItem[] = [
        {
            icon: "fas fa-filter",
            name: "simple",
            text: "Simple",
            selected:true,
            groupName: "mode",

        },
        {
            icon: "fas fa-filter",
            name: "advance",
            text: "Advance",
            groupName: "mode",
        }
    ]

    @Input()
    groups: AXFilterColumnGroup[] = [];

    constructor() { }

    ngOnInit(): void { }
}
