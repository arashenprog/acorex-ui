import { Component, OnInit } from '@angular/core';
import { AXBasePageComponent, CheckItem, PromisResult, AXDataSourceReadParams, AXDateTime } from 'acorex-ui';

@Component({
    template: `
    <ax-page>
        <ax-page-content>
            <ax-container>
                <ax-row>
                    <ax-col col-md="12">
                       <ax-select-box>
                            <ax-data-source>
                                <ax-callback-read [provideData]="provideData"></ax-callback-read>
                            </ax-data-source>
                       </ax-select-box>
                    </ax-col>
                </ax-row>
                <ax-row>
                    <ax-col col-xs="6" col-md="12">
                        <span tooltip='{{ theTime | dt:"L LT"}}' placement="top">{{ theTime | dt:"P"}}</span>
                    </ax-col>
                </ax-row>
            </ax-container>
        </ax-page-content>
    </ax-page>
  `
})
export class SelectBoxPage extends AXBasePageComponent {

    constructor() {
        super()
    }

    theTime = new AXDateTime();

    data = [
        {
            value: 1,
            text: "item 1",
        },
        {
            value: 2,
            text: "item 2",
        }, {
            value: 3,
            text: "item 3",
        }
    ];
    provideData = (params: AXDataSourceReadParams) => {
        debugger;
        return PromisResult.resolve(this.data.filter(c => !params.searchText || c.text.includes(params.searchText)));
    }

}
