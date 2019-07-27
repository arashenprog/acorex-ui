export class AXFilterColumn {
    active?: boolean;
    field: string;
    caption: string;
    dataType: "string" | "date" | "datetime" | "time" | "number";
}

export class AXFilterColumnGroup {
    caption: string;
    columns: AXFilterColumn[];
}


export type AXFilterCondition = "is" | "is-not" | "contains" | "not-contains" | "start-width" | "end-width" | "is-empty" | "is-not-empty";

export class AXFilterRule {
    field: string;
    value: any;
    condition:AXFilterCondition;
}