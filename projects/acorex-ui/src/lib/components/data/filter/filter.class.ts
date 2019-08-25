import { Input, ChangeDetectorRef, EventEmitter, Output } from "@angular/core";

//export type AXFilterConditionEnum = "is" | "is-not" | "contains" | "not-contains" | "start-width" | "end-width" | "is-empty" | "is-not-empty";

export class AXFilterColumn {
    field: string;
    caption: string;
    dataType: "string" | "date" | "datetime" | "time" | "number";
    type?: "text" | "selection" | "date" | "number";
    options?: any;
}

export class AXFilterColumnGroup {
    caption?: string;
    columns: AXFilterColumn[];
}

export class AXFilterCondition {
    field: string;
    condition: string;
    dataType: "string" | "date" | "datetime" | "time" | "number";
    value: any;
}

export abstract class AXFilterColumnComponent {

    constructor(protected cdr: ChangeDetectorRef) {

    }
    operator: string = "equal";
    value: any = null;
    @Input()
    field: string = null;

    @Input()
    dataType: "string" | "date" | "datetime" | "time" | "number" = "string";


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


    get condition(): AXFilterCondition {
        return {
            condition: this.operator,
            field: this.field,
            value: this.value,
            dataType: this.dataType
        }
    }

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


