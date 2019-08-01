import { Component, OnInit, Input } from '@angular/core';
import { AXFilterCondition, AXFilterColumn, AXFilterColumnComponent } from '../filter.class';

@Component({
    selector: 'ax-filter-column-string',
    template: `
        <div class="form-inline">
            <select class="form-control form-control-sm"  [(ngModel)]="operator">
                <option *ngFor="let o of operators" [attr.value]="o.value">
                    {{o.title}}
                </option>
            </select>
            <ax-text-box placeholder="Type here" [(text)]="value">
            </ax-text-box>
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
            value: "like"
        },
        {
            title: "not contains",
            value: "not-like"
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
            value: "is-not-empty"
        }
    ];
    constructor() {
        super();
     }


    

}
