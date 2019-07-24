export class AXFilterColumn
{
    active?:boolean;
    field:string;
    caption:string;
    dataType:"string"|"date"|"datetime"|"time"|"number";
}

export class AXFilterColumnGroup
{
    caption:string;
    columns:AXFilterColumn[];
}