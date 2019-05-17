
export interface AXSortParams
{
    field?:string;
    sort?:"asc"|"desc";
}

export interface AXFilterParams
{
    field?:string;
    filters?:AXFilterConditionParams[];
}

export interface AXFilterConditionParams
{
    dataType?:"text"|"number"|"date";
    type?:"contains"|"equal"|"notEqual";
    value?:any;
}

export interface AXDataSourceReadParams
{
    skip?:number;
    take?:number;
    sort?:AXSortParams[];
    filter?:AXFilterParams[];
    searchText?:string;
}