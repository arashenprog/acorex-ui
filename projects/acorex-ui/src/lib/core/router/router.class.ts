
export interface AXRoute
{
    path?:string,
    component?:any;
    title?:string;
    routes:AXRoute[],

}
export declare type AXRoutes = AXRoute[];