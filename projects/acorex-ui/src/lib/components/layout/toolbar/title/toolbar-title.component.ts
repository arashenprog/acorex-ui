import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AXToolbarItem } from '../toolbar-item';

@Component({
    selector: 'ax-toolbar-title',
    template: '<div class="title">{{text}}</div>',
    styles:[`
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
