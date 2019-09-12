import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AXToolbarItem } from '../toolbar-item';

@Component({
    selector: 'ax-toolbar-title',
    template: `
        <ng-container *ngIf="text; else elseTemplate">
        <div class="title"> {{text}}</div>
        </ng-container>
        <ng-template #elseTemplate>
            <ng-content></ng-content>
        </ng-template>`,
    styles: [`
        .title{
            font-weight:bold;
        }
    `],
    providers: [{ provide: AXToolbarItem, useExisting: AXToolbarTitleComponent }]
})
export class AXToolbarTitleComponent {
    constructor() { }

    private _text: string;
    @Input()
    public get text(): string {
        return this._text;
    }
    public set text(v: string) {
        if (v !== this._text) {
            this._text = v;
        }
    }
}
