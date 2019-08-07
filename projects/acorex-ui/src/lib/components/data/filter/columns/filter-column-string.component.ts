import { Component, OnInit, Input } from '@angular/core';
import { AXFilterCondition, AXFilterColumn, AXFilterColumnComponent } from '../filter.class';

@Component({
    selector: 'ax-filter-column-string',
    template: `
        <div class="form-inline">
           <div class="row">
                <div class="col-5">
                    <select class="form-control form-control-sm"  [(ngModel)]="operator">
                        <option *ngFor="let o of operators" [attr.value]="o.value">
                            {{o.title}}
                        </option>
                    </select>
                </div>
                <div class="col-7">
                    <ax-text-box placeholder="Type here" [(text)]="value" *ngIf="operator!='is-not-empty' && operator!='is-empty'">
                    </ax-text-box>
                </div>
           </div>
        </div>
    `,
    providers: [
        { provide: AXFilterColumnComponent, useExisting: AXFilterColumnStringComponent }
      ]
})
export class AXFilterColumnStringComponent extends AXFilterColumnComponent {

    operators: any[] = [
        {
            title: "is",
            value: "equal"
        },
        {
            title: "isn't",
            value: "not-equal"
        },
        {
            title: "contains",
            value: "contains"
        },
        {
            title: "not contains",
            value: "not-contains"
        },
        {
            title: "start with",
            value: "start-width"
        },
        {
            title: "end with",
            value: "end-width"
        },
        {
            title: "is empty",
            value: "is-empty"
        },
        {
            title: "isn't empty",
            value: "is-not-empty"
        }
    ];
    constructor() {
        super();
     }


    

}
