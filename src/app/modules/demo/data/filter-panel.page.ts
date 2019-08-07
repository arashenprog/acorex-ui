import { Component, OnInit } from '@angular/core';
import {
    AXHttpService,
    AXToastService,
    DialogService,
    AXPopupService,
    AXBasePageComponent,
    AXFilterColumnGroup
} from 'acorex-ui';

@Component({

    templateUrl: './filter-panel.page.html',
})
export class FilterPanelDemoPage extends AXBasePageComponent {


    filterGroups: AXFilterColumnGroup[] = [
        {
            caption: "Next Action",
            columns: [
                {
                    caption: "Apply Date",
                    dataType: "string",
                    field: "applyDate"
                },
                {
                    caption: "Staff",
                    dataType: "string",
                    field: "staff"
                }
            ]
        },
        {
            caption: "Staff",
            columns: [
                {
                    caption: "Apply Date",
                    dataType: "date",
                    field: "applyDate",
                    type:"date"
                },
                {
                    caption: "Staff",
                    dataType: "number",
                    type:"selection",
                    options:{
                        mode:"single",
                        items:[
                            {
                                text:"Ali",
                                value:1
                            },
                            {
                                text:"Arash",
                                value:2
                            },
                        ]
                    },
                    field: "staff"
                }
            ]
        }

    ];

    constructor(
        private http: AXHttpService,
        private toast: AXToastService,
        private dialog: DialogService,
        private popup: AXPopupService
    ) {
        super();
    }
}
