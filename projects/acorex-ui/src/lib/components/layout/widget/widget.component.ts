import { Component, OnInit, Input, ViewEncapsulation, EventEmitter, Output, ViewChild } from '@angular/core';


export interface IWidgetComponent {

    isInEditing: boolean;

    isLoading: boolean;

    showTitle: boolean;

    type: "green" | "blue" | "orange" | "red" | "teal";

    title: string;

    onRemoved: EventEmitter<IWidgetComponent>;
}


@Component({
    selector: "ax-widget",
    templateUrl: './widget.component.html',
    styleUrls: ['./widget.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AXWidgetContainerComponent implements IWidgetComponent {
    type: "green" | "blue" | "orange" | "red" | "teal";
    title: string;
    isInEditing: boolean;
    showTitle: boolean;
    isLoading: boolean;

    @Output()
    onRemoved: EventEmitter<IWidgetComponent> = new EventEmitter<IWidgetComponent>();

    remove(e) {
       
        this.onRemoved.emit(this);
    }
}

export class AXWidgetComponent implements IWidgetComponent {

    @ViewChild(AXWidgetContainerComponent) container: AXWidgetContainerComponent;

    @Output()
    isInEditingChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    private _isInEditing: boolean;
    @Input()
    public get isInEditing(): boolean {
        return this._isInEditing;
    }
    public set isInEditing(v: boolean) {
        this._isInEditing = v;
        this.isInEditingChange.emit(v);
    }


    @Output()
    isLoadingChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    private _isLoading: boolean;
    @Input()
    public get isLoading(): boolean {
        return this._isLoading;
    }
    public set isLoading(v: boolean) {
        this._isLoading = v;
        this.isLoadingChange.emit(v);
    }


    showTitle: boolean;

    uid: number;


    @Input()
    title: string;

    @Input()
    type: "green" | "blue" | "orange" | "red" | "teal" = "blue";

    @Output()
    onRemoved: EventEmitter<IWidgetComponent> = new EventEmitter<IWidgetComponent>();

    constructor() {
        this.uid = Math.round(Math.random() * 100000000);
        this.isLoadingChange.subscribe(value => {
            this.container.isLoading = value;
        });
        this.isInEditingChange.subscribe(value => {
            this.container.isInEditing = value;
        });


    }

    ngOnInit(): void {
        this.container.showTitle = this.showTitle;
        this.container.title = this.title;
        this.container.type = this.type;
        this.container.onRemoved.subscribe(c => {
            this.isInEditing = false;
            setTimeout(() => {
                this.onRemoved.emit(this);    
            }, 50);
            
        });
    }


}



