import { Input, ContentChild, TemplateRef, Component, ChangeDetectionStrategy } from '@angular/core';
import { AXGridCellParams } from '../datagrid.events';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';


export abstract class AXGridDataColumn {

    @ContentChild(TemplateRef) templateRef: TemplateRef<any>;

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
        if (this.templateRef != null) {
            col.cellRendererFramework = AXDataGridCellTemplateRenderer;
            col.cellRendererParams = {
                templateRef: this.templateRef
            }
        }
        if (!this.allowFiltering) {
            col.filter = false;
        }
        return col;
    }
}

@Component({
    template: `
        <ng-container *ngTemplateOutlet="templateRef; context: { cellValue: cellValue,rowData:rowData }">
        </ng-container>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXDataGridCellTemplateRenderer implements ICellRendererAngularComp {
    cellValue: any;
    rowData: any;
    templateRef: TemplateRef<any>;

    constructor() { }
    agInit(params: ICellRendererParams): void {
        this.cellValue = params.value;
        this.rowData = params.data;
        this.templateRef = (<any>params).templateRef;
    }

    refresh(params: ICellRendererParams): boolean {
        return true;
    }
}






