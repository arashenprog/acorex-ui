import { Component, OnInit, ContentChild, Input, ContentChildren, QueryList } from "@angular/core";
import { AXDataSourceComponent } from '../datasource/datasource.component';
import { AXGridDataColumn } from './columns/column.component';
import { AXDataSourceReadParams } from '../datasource/read-param';
import { GridOptions } from 'ag-grid-community';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: "ax-data-grid",
  templateUrl: "./datagrid.component.html",
  styleUrls: ["./datagrid.component.scss"],
  encapsulation:ViewEncapsulation.None
})
export class AXDataGridComponent implements OnInit {

  constructor() { }

  private gridApi;

  @ContentChildren(AXGridDataColumn)
  private _columns: QueryList<AXGridDataColumn>;

  @ContentChild(AXDataSourceComponent)
  private dataSource: AXDataSourceComponent;

  @Input()
  title: string;

  columnDefs: any[] = [];

  searchText: string = "";
  rowModelType = "clientSide";
  rowGroupPanelShow = "always";


  private remoteOperation: boolean = false;



  onGridReady(gridOptions: GridOptions) {
    debugger;
    this.gridApi = gridOptions.api;
    const that = this;

    //
    if (that.remoteOperation) {
      let dataSource = {
        rowCount: null,
        getRows: function (params) {
          console.log("grid filetr", params);
          let loadParams: AXDataSourceReadParams = {};
          loadParams.searchText = that.searchText;
          loadParams.skip = params.startRow;
          loadParams.take = params.endRow - params.startRow;
          loadParams.sort = params.sortModel.map(c => {
            return {
              field: c.colId,
              sort: c.sort
            }
          });
          // loadParams.filter = params.sortModel.map(c => {
          //   return {
          //     field: c.colId,
          //     sort: c.sort
          //   }
          // });
          that.dataSource.fetch(loadParams).then(c => {
            params.successCallback(c, c.length);
          })
        }
      };
      gridOptions.api.setDatasource(dataSource);
    }
    else {
      that.dataSource.onDataReceived.subscribe(c => {
        that.gridApi.setRowData(c)
      });
      //
      this.refresh();
    }
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    debugger;
    this.remoteOperation = (<any>this.dataSource.read).remoteOperation;
    if (this.remoteOperation)
      this.rowModelType = "infinite";

    this.mapColumns();
  }

  mapColumns() {
    this.columnDefs = this._columns.map(c => c.render());
  }


  refresh() {
    if (this.remoteOperation) {
      this.gridApi.refreshView();
    }
    else {
      this.dataSource.fetch();
    }
  }

  onSearch(e) { }
}
