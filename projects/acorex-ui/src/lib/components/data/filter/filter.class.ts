import { Input, ChangeDetectorRef } from "@angular/core";

//export type AXFilterConditionEnum = "is" | "is-not" | "contains" | "not-contains" | "start-width" | "end-width" | "is-empty" | "is-not-empty";

export class AXFilterColumn {
    field: string;
    caption: string;
    dataType: "string" | "date" | "datetime" | "time" | "number";
    type?: "text" | "selection" | "date";
    options?: any;
    active?: boolean;
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

    constructor(protected cdr:ChangeDetectorRef)
    {

    }
    operator: string = "equal";
    value: any = null;
    @Input()
    field: string = null;

    @Input()
    dataType: "string" | "date" | "datetime" | "time" | "number" = "string";

    @Input()
    active: boolean = false;

    get condition(): AXFilterCondition {
        return {
            condition: this.operator,
            field: this.field,
            value: this.value,
            dataType: this.dataType
        }
    }

    clear() {
        this.active=false;
        this.value = null;
        this.cdr.markForCheck();
    }
}


