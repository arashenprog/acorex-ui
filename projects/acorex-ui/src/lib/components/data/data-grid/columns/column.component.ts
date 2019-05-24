import { Input } from '@angular/core';


export abstract class AXGridDataColumn {

    @Input()
    width: number = 100;

    @Input()
    maxWidth: number;

    @Input()
    minWidth: number;

    @Input()
    pinned: "start" | "end" | null = null;

    @Input()
    sortable: boolean = true;

    @Input()
    sort: "asc" | "desc" | null = null;

    @Input()
    field: string = "";

    @Input()
    caption: string = "";

    constructor() { }

    render(): any {
        const col: any = {
            field: this.field,
            width: this.width,
        };
        if (this.caption)
            col.headerName = this.caption;
        if (this.minWidth)
            col.minWidth = this.minWidth;
        if (this.maxWidth)
            col.maxWidth = this.maxWidth;
        if (this.pinned)
            col.pinned = this.pinned == "start" ? "left" : "right"; //TODO: Change based on layout
        if (this.sortable)
            col.sortable = this.sortable;
        if (this.sort)
            col.sort = this.sort;
        return col;
    }
}






