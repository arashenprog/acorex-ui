import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'ax-filter-column-string',
    template: `
        <div class="form-inline">
            <select class="form-control form-control-sm">
                <option *ngFor="let o of operators" [value]="o.value">
                    {{o.title}}
                </option>
            </select>
            <ax-text-box placeholder="Type here">
            </ax-text-box>
        </div>
    `
})
export class AXFilterColumnString  {

    operators:any[]=[
        {
            title:"is",
            value:"equal"
        },
        {
            title:"isn't",
            value:"not-equal"
        },
        {
            title:"contains",
            value:"like"
        },
        {
            title:"not contains",
            value:"not-like"
        },
        {
            title:"start with",
            value:"start-width"
        },
        {
            title:"end with",
            value:"end-width"
        },
        {
            title:"is empty",
            value:"is-not-empty"
        }
    ];
    constructor() { }

}
