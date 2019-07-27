import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AXFilterRule, AXFilterCondition } from '../filter.class';

@Component({
    selector: 'ax-filter-column-string',
    template: `
        <div class="form-inline">
            <select class="form-control form-control-sm" [(ngModel)]="condition">
                <option *ngFor="let c of conditions" [value]="c.value">
                    {{c.title}}
                </option>
            </select>
            <ax-text-box placeholder="Type here" [(text)]="value">
            </ax-text-box>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFilterColumnString {

    condition: AXFilterCondition = "is";
    field: string;
    value: string;

    conditions: any[] = [
        {
            title: "is",
            value: "is"
        },
        {
            title: "is-not",
            value: "is-not"
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
            title: "is empty",
            value: "is-not-empty"
        }
    ];
    constructor() {

    }

    get rule(): AXFilterRule {
        return {
            field: this.field,
            condition: this.condition,
            value: this.value
        }
    }

}
