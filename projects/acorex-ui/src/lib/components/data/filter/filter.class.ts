import { Input } from "@angular/core";

export class AXFilterColumn
{
    field:string;
    caption:string;
    dataType:"string"|"date"|"datetime"|"time"|"number";
}

export class AXFilterColumnGroup
{
    caption:string;
    columns:AXFilterColumn[];
}

export class AXFilterCondition
{
    field:string;
    condition:string;
    value:any;
}

export class AXFilterColumnComponent
{
    operator: string = "equal";
    value: any = null;
    @Input()
    field: string = null;

    @Input()
    active: boolean = false;

    get condition(): AXFilterCondition {
        return {
            condition: this.operator,
            field: this.field,
            value: this.value
        }
    }

    clear()
    {
        this.operator="equal";
        this.value = null;
    }
}