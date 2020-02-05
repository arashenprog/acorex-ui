import { Input, ContentChild, TemplateRef } from '@angular/core';
import { AXGridCellParams } from '../datagrid.events';
import { AXDataGridCellTemplateRenderer, AXDataGridCellTemplateComponent } from '../templates/cell-template.component';


export abstract class AXGridDataColumn {


    @ContentChild(AXDataGridCellTemplateComponent)
    cellTemplate: AXDataGridCellTemplateComponent;

    @Input()
    width: number = 100;

    @Input()
    maxWidth: number;

    @Input()
    minWidth: number;

    @Input()
    pinned: "start" | "end" | null = null;

    @Input()
    allowSorting: boolean = true;

    @Input()
    allowFiltering: boolean = false;

    @Input()
    rowGroupIndex: number = -1;

    @Input()
    enableRowGroup: boolean = true;


    @Input()
    cellClass: (params: AXGridCellParams) => (string | string[]) | (string | string[]);


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
        if (this.allowSorting)
            col.sortable = this.allowSorting;
        if (this.sort)
            col.sort = this.sort;
        if (this.enableRowGroup)
            col.enableRowGroup = this.enableRowGroup;


        if (this.rowGroupIndex >= 0) {

            col.rowGroupIndex = this.rowGroupIndex;
            col.rowGroup = true;
        }

        if (this.cellClass) {
            let THAT = this;
            if (this.cellClass instanceof Function)
                col.cellClass = function (p) {
                    return THAT.cellClass({
                        column: THAT,
                        rowIndex: p.node.rowIndex,
                        rowLevel: p.node.level,
                        data: p.data,
                        value: p.value
                    });
                }
            else
                col.cellClass = this.cellClass;
        }
        //
        if (this.cellTemplate != null) {
            col.cellRendererFramework = this.cellTemplate.renderer;
            col.cellRendererParams = this.cellTemplate.params;
        }
        if (!this.allowFiltering) {
            col.filter = false;
        }
        return col;
    }
}








