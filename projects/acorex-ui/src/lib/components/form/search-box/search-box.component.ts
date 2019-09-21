import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AXKeyboardEvent } from '../../../core/events/keyboard';

@Component({
    selector: 'ax-search-box',
    templateUrl: './search-box.component.html',
    styleUrls: ['./search-box.component.scss'],
})
export class AXSearchBoxComponent {
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
        debugger;
        if (v !== this._text) {
            this._text = v;
            this.onTextChanged.emit(v);
        }
    }



    onSearchChanged(e: AXKeyboardEvent) {
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

        this.searchChangeObserver.next((<any>e.target).value);
    }
}
