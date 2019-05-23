import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AXToolbarItem } from '../toolbar-item';

@Component({
    selector: 'ax-toolbar-search',
    templateUrl: './toolbar-search.component.html',
    styleUrls: ['./toolbar-search.component.scss'],
    providers: [{ provide: AXToolbarItem, useExisting: AXToolbarSearchComponent }]
})
export class AXToolbarSearchComponent {
    constructor() { }

    private searchChangeObserver: any;

    @Output()
    onTextChanged: EventEmitter<string> = new EventEmitter<string>();

    private _text: string;
    @Input()
    public get text(): string {
        return this._text;
    }
    public set text(v: string) {
        if (v !== this._text) {
            this._text = v;
            this.onTextChanged.emit(v);
        }
    }



    onSearchChanged(text: string) {
        if (!this.searchChangeObserver) {
            Observable.create(observer => {
                this.searchChangeObserver = observer;
            })
                .pipe(debounceTime(500))
                .pipe(distinctUntilChanged())
                .subscribe(c => {
                    this.text = c;
                });
        }

        this.searchChangeObserver.next(text);
    }
}
