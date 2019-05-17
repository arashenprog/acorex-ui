import { Component, ChangeDetectionStrategy, ViewChild, ViewContainerRef } from '@angular/core';
import { AXGridDataColumn } from './column.component';
import { ICellRendererAngularComp, IFilterAngularComp } from 'ag-grid-angular';
import { ICellRendererParams, IFilterParams, RowNode, IDoesFilterPassParams, IAfterGuiAttachedParams } from 'ag-grid-community';



@Component({
    selector: "ax-check-column",
    template: "",
    providers: [{ provide: AXGridDataColumn, useExisting: AXGridCheckColumn }],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXGridCheckColumn extends AXGridDataColumn  {
    
    constructor() {
        super();
    }

    render() {
        let col = super.render();
        col.cellRendererFramework = BooleanRenderer;
        col.filterFramework = BooleanFilterRenderrer;
        return col;
    }
}


@Component({
    template: `<input type="checkbox"   [(ngModel)]="value" [ngModelOptions]="{standalone: true}" readonly/>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BooleanRenderer implements ICellRendererAngularComp {
    value: boolean;
    constructor() {

    }
    agInit(params: ICellRendererParams): void {
        this.value = params.value;
    }
    refresh(params: ICellRendererParams): boolean {
        this.value = params.value;
        return true;
    }
}

@Component({
    template: `<input type="checkbox" #input (ngModelChange)="onChange($event)" [ngModel]="value" >`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BooleanFilterRenderrer implements IFilterAngularComp {
    public value?: boolean = null;
    private params: IFilterParams;
    private valueGetter: (rowNode: RowNode) => any;
    @ViewChild('input', {read: ViewContainerRef}) public input;

    agInit(params: IFilterParams): void {
        this.params = params;
        this.valueGetter = params.valueGetter;
    }

    isFilterActive(): boolean {
        return this.value !== null && this.value !== undefined ;
    }

    doesFilterPass(params: IDoesFilterPassParams): boolean {
        return this.value == this.valueGetter(params.node);
    }

    getModel(): any {
        return {value: this.value,"hi":"arash"};
    }

    setModel(model: any): void {
        this.value = model ? model.value : null;
    }

    ngAfterViewInit(params: IAfterGuiAttachedParams): void {
        window.setTimeout(() => {
            this.input.element.nativeElement.focus();
        })
    }

    onChange(newValue): void {
        if (this.value !== newValue) {
            this.value = newValue;
            this.params.filterChangedCallback();
        }
    }
  
}