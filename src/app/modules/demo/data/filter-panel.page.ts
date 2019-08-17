import { Component, OnInit, ViewChild } from '@angular/core';
import {
    AXHttpService,
    AXToastService,
    DialogService,
    AXPopupService,
    AXBasePageComponent,
    AXFilterColumnGroup,
    PromisResult,
    AXDateTime,
    AXDataGridComponent
} from 'acorex-ui';

const STATUS = [
    {
        text: "Reply Email",
        value: 1
    },
    {
        text: "Contact Customer",
        value: 2
    },
    {
        text: "Book Visit",
        value: 3
    },
    {
        text: "Waiting for Visit",
        value: 4
    },
    {
        text: "Measure and Quotes",
        value: 5
    },
    {
        text: "Check Price and Stock",
        value: 6
    },
    {
        text: "Waiting on Supplier",
        value: 7
    },
    {
        text: "Calculate cost and set sell price",
        value: 8
    },
    {
        text: "Send Quote",
        value: 9
    },
    {
        text: "Follow Up",
        value: 10
    },
    {
        text: "Accepted Verbally Check Payment Received",
        value: 11
    },
    {
        text: "Deposit Recieved",
        value: 12
    },
    {
        text: "Commision Paid",
        value: 13
    },
    {
        text: "Not Worth It",
        value: 14
    },
    {
        text: "Lost To Competition",
        value: 15
    },
    {
        text: "Archive for Won Leads",
        value: 16
    },
]

@Component({

    templateUrl: './filter-panel.page.html',
})
export class FilterPanelDemoPage extends AXBasePageComponent {


    filterGroups: AXFilterColumnGroup[] = [
        {
            caption: "STATUS",
            columns: [
                {
                    caption: "Current Status",
                    dataType: "number",
                    type: "selection",
                    options: {
                        mode: "multiple",
                        items: STATUS
                    },
                    field: "statusId"
                },
                {
                    caption: "Next Action",
                    dataType: "number",
                    type: "selection",
                    options: {
                        mode: "single",
                        items: STATUS
                    },
                    field: "nextActionId"
                },

            ]
        },
        {
            caption: "TASK",
            columns: [
                {
                    caption: "Staff",
                    dataType: "number",
                    type: "selection",
                    options: {
                        mode: "multiple",
                        items: [
                            {
                                text: "Sam",
                                value: 1
                            },
                            {
                                text: "Fred",
                                value: 2
                            },
                            {
                                text: "Kia",
                                value: 3
                            },
                            {
                                text: "Alex",
                                value: 4
                            },
                            {
                                text: "Bahar",
                                value: 4
                            },
                            {
                                text: "Alireza",
                                value: 4
                            },
                        ]
                    },
                    field: "staff"
                },
                {
                    caption: "Register Date",
                    dataType: "date",
                    type: "date",
                    field: "registerDate"
                }
            ]
        },
        {
            caption: "CONTACT",
            columns: [
                {
                    caption: "Firstname",
                    dataType: "string",
                    type: "text",
                    field: "firstname"
                },
                {
                    caption: "Lastname",
                    dataType: "string",
                    type: "text",
                    field: "lastname"
                },
                {
                    caption: "Email",
                    dataType: "string",
                    type: "text",
                    field: "email"
                }
            ]

        }

    ];

    @ViewChild('grid') grid: AXDataGridComponent;


    provideGridData = () => {
        return new PromisResult(resolve => {
            resolve(this.leads.query(this.gridFilter));
        });
    };

    constructor(
        private http: AXHttpService,
        private toast: AXToastService,
        private dialog: DialogService,
        private popup: AXPopupService
    ) {
        super();
        for (let i = 0; i < 300; i++) {
            let lead: any = {};
            lead.firstname = ["Arash", "Reza", "Ali","Alireza", "Kit", "Rod", "Sam"].pickRandom();
            lead.lastname = ["Enprog", "Safari", "Jenson", "Hamish"].pickRandom();
            lead.source = ["Chat", "Website", "Social", "Ads", null].pickRandom();
            let status = STATUS.pickRandom();
            let nextAction = STATUS.pickRandom();
            lead.status=status.text;
            lead.statusId=status.value;
            lead.nextAction=nextAction.text;
            lead.nextActionId=nextAction.value;
            lead.registerDate = new AXDateTime().add("day", i-[10, 0, 23, 37, 98].pickRandom());
            this.leads.push(lead);
        }
    }

    leads: any[] = [];

    gridFilter: any = null;
    onFilterChange(filter) {
        this.gridFilter = filter;
        this.grid.refresh();
    }
}
