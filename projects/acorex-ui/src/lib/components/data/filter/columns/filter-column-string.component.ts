import { Component, OnInit, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { AXFilterCondition, AXFilterColumn, AXFilterColumnComponent } from '../filter.class';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Component({
    selector: 'ax-filter-column-string',
    template: `
        <div class="ax-filter-section">
            <div>
                <select (ngModelChange)="onOperatorChange($event)" class="form-control form-control-sm"  [(ngModel)]="operator">
                    <option *ngFor="let o of operators" [attr.value]="o.value">
                        {{o.title}}
                    </option>
                </select>
            </div>
            <div>
                <ax-text-box placeholder="Type here" (textChange)="onTextChange($event)" [(text)]="value" *ngIf="operator!='is-not-empty' && operator!='is-empty'">
                </ax-text-box>
            </div>
        </div>
    `,
    providers: [
        { provide: AXFilterColumnComponent, useExisting: AXFilterColumnStringComponent }
    ]
})
export class AXFilterColumnStringComponent extends AXFilterColumnComponent {


    operator: string = "contains";
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
            value: "start-with"
        },
        {
            title: "end with",
            value: "end-with"
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
    constructor(protected cdr: ChangeDetectorRef) {
        super(cdr);
    }

    private searchChangeObserver: any;

    onOperatorChange(e) {

        this.valueChange.emit();

    }

    onTextChange(e) {

        if (!this.searchChangeObserver) {
            Observable.create(observer => {
                this.searchChangeObserver = observer;
            })
                .pipe(debounceTime(500))
                .pipe(distinctUntilChanged())
                .subscribe(c => {
                    this.valueChange.emit();
                });
        }
        this.searchChangeObserver.next(e);


    }

    get condition(): AXFilterCondition {
        return {
            condition: this.operator,
            field: this.field,
            dataType: "string",
            value: this.value
        }
    }




}
