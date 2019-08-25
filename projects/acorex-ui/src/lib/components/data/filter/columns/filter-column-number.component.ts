import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { AXFilterCondition, AXFilterColumn, AXFilterColumnComponent } from '../filter.class';

@Component({
    selector: 'ax-filter-column-number',
    template: `
        <div class="ax-filter-section">
            <div>
                <select class="form-control form-control-sm"  [(ngModel)]="operator">
                    <option *ngFor="let o of operators" [attr.value]="o.value">
                        {{o.title}}
                    </option>
                </select>
            </div>
            <div>
                <ax-text-box placeholder="Type here" [(text)]="value" *ngIf="operator!='is-not-empty' && operator!='is-empty'">
                </ax-text-box>
            </div>
        </div>
    `,
    providers: [
        { provide: AXFilterColumnComponent, useExisting: AXFilterColumnNumberComponent }
    ]
})
export class AXFilterColumnNumberComponent extends AXFilterColumnComponent {

    operator: string = "equal";
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
            title: "less than",
            value: "less-than"
        },
        {
            title: "less than or equal",
            value: "less-than-equal"
        },
        {
            title: "greater than",
            value: "greater-than"
        },
        {
            title: "greater than or equal",
            value: "greater-than-equal"
        },
        // 
        {
            title: "is empty",
            value: "is-empty"
        },
        {
            title: "isn't empty",
            value: "is-not-empty"
        }
    ];
    constructor(protected cdr: ChangeDetectorRef) {
        super(cdr);
    }
    




}
