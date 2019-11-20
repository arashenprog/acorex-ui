import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { PromisResult } from '../../../../core/base.class';
import { AXBasePageComponent } from "../../../nav/page.component"
import { AXDataGridComponent } from '../../data-grid/datagrid.component';
import { AXGridDataColumn } from '../../data-grid/columns/column.component';
import { AXDataSourceComponent } from '../../data-source/datasource.component';
@Component({
    templateUrl: './data-lov-popup.component.html',
    styleUrls: ['./data-lov-popup.component.scss']
})
export class AXDataLovPopupComponent extends AXBasePageComponent {


    @ViewChild("grid", /* TODO: add static flag */ {})
    grid: AXDataGridComponent;


    columns: AXGridDataColumn[] = [];

    selectedItems: any[] = [];


    constructor() {
        super()
    }

    dataSource: AXDataSourceComponent;

    selectionMode: string;

    onDoneClick() {
        if (this.selectedItems && this.selectedItems.length) {
            this.close(this.selectedItems);
        }
        else {
            this.close();
        }
    }

    onCancelClick() {
        this.close();
    }

    onSelectionChanged(e) {
        this.selectedItems = e.items;
    }

    ngAfterViewInit() {
        this.grid.refresh();
    }
}
