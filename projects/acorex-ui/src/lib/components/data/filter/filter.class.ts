import { Input, ChangeDetectorRef, EventEmitter, Output, Directive } from "@angular/core";

//export type AXFilterConditionEnum = "is" | "is-not" | "contains" | "not-contains" | "start-width" | "end-width" | "is-empty" | "is-not-empty";

export interface AXFilterColumn {
    field: string;
    caption: string;
    type?: "text" | "selection" | "date" | "number";
    options?: any;
}

export interface AXFilterColumnGroup {
    caption?: string;
    columns: AXFilterColumn[];
}

export interface AXFilterCondition {
    field: string;
    condition: string;
    dataType: "string" | "date" | "datetime" | "time" | "number";
    value: any;
}

export interface AXFilterPredefined {
    name: string;
    title: string,
    value: AXFilterCondition[];
}

@Directive()
export abstract class AXFilterColumnComponent {

    constructor(protected cdr: ChangeDetectorRef) {

    }
    operator: string = "equal";
    value: any = null;
    @Input()
    field: string = null;

    @Output()
    valueChange: EventEmitter<AXFilterCondition[]> = new EventEmitter<AXFilterCondition[]>();


    @Output()
    activeChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    private _active: boolean;
    @Input()
    public get active(): boolean {
        return this._active;
    }
    public set active(v: boolean) {
        this._active = v;
        this.activeChange.emit(v);
    }


    abstract get condition(): AXFilterCondition;

    clear() {
        this.active = false;
        this.value = null;
        this.cdr.markForCheck();
    }

    setFilter(value: any, operator: string) {
        this.active = true;
        this.operator = operator;
        this.value = value;
        this.cdr.markForCheck();
    }
}


