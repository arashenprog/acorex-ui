import { Component, ContentChild, TemplateRef, ChangeDetectionStrategy } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { ICellRendererParams } from "ag-grid-community";

@Component({
    selector: "ax-cell-template",
    template: `<ng-content></ng-content>
   `
})

export class AXDataGridCellTemplateComponent {
    @ContentChild(TemplateRef, { static: true }) templateRef: TemplateRef<any>;
    renderer: any;
    params: any;
    constructor() {
        this.renderer = AXDataGridCellTemplateRenderer;
    }
    ngOnInit(): void {
        this.params = {
            templateRef: this.templateRef
        }
    }
}





@Component({
    template: `
        <ng-container *ngTemplateOutlet="templateRef; context: { $implicit: rowData }">
        </ng-container>
    `
})
export class AXDataGridCellTemplateRenderer implements ICellRendererAngularComp {
    rowData: any;
    templateRef: TemplateRef<any>;

    constructor() { }

    agInit(params: ICellRendererParams): void {
        this.rowData = params.data;
        this.templateRef = (<any>params).templateRef;
    }

    refresh(params: ICellRendererParams): boolean {
        this.rowData = params.data;
        return true;
    }
}