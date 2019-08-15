import { Component, OnInit, ContentChild, Input, ContentChildren, QueryList, EventEmitter, Output, TemplateRef } from "@angular/core";
import { AXDataSourceComponent } from '../data-source/datasource.component';
import { AXGridDataColumn } from './columns/column.component';
import { AXDataSourceReadParams } from '../data-source/read-param';
import { GridOptions, CellClickedEvent, RowClickedEvent, CellEvent, RowEvent } from 'ag-grid-community';
import { ViewEncapsulation } from '@angular/core';
import { AXGridCellEvent, AXGridRowEvent, AXGridRowSelectionEvent } from './events.class';
import { AXToolbarSearchComponent } from "../../layout/toolbar/search/toolbar-search.component";
import { AXToolbarComponent } from "../../layout/toolbar/toolbar.component";
import { AXDataGridRowTemplateComponent } from "./templates/row-template.component";



@Component({
  selector: "ax-data-grid",
  templateUrl: "./datagrid.component.html",
  styleUrls: ["./datagrid.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class AXDataGridComponent {


  @Output()
  cellClick: EventEmitter<AXGridCellEvent> = new EventEmitter<AXGridCellEvent>();
  @Output()
  cellDbClick: EventEmitter<AXGridCellEvent> = new EventEmitter<AXGridCellEvent>();
  @Output()
  cellFocuse: EventEmitter<AXGridCellEvent> = new EventEmitter<AXGridCellEvent>()
  @Output()
  rowClick: EventEmitter<AXGridRowEvent> = new EventEmitter<AXGridRowEvent>();;

  @Output()
  rowDbClick: EventEmitter<AXGridRowEvent> = new EventEmitter<AXGridRowEvent>();
  @Output()
  selectionChanged: EventEmitter<AXGridRowSelectionEvent> = new EventEmitter<AXGridRowSelectionEvent>();





  constructor() {

  }

  private gridApi;
  private dataSourceSuccessCallback;

  @ContentChildren(AXGridDataColumn)
  private _columns: QueryList<AXGridDataColumn>;


  @ContentChild(AXToolbarSearchComponent)
  searchInput: AXToolbarSearchComponent;

  @ContentChild(AXToolbarComponent)
  toolbar: AXToolbarComponent;

  @ContentChild(AXDataGridRowTemplateComponent)
  rowTemplate: AXDataGridRowTemplateComponent;


  @ContentChild(AXDataSourceComponent)
  private dataSource: AXDataSourceComponent;

  @Input()
  title: string;

  columnDefs: any[] = [];



  private _searchText: string;
  @Input()
  public get searchText(): string {
    return this._searchText;
  }
  public set searchText(v: string) {
    if (v != this._searchText) {
      this._searchText = v;
      if (this.gridApi)
        this.gridApi.setQuickFilter(this.searchText);
    }
  }



  private _filter: any[];
  @Input()
  public get filter(): any[] {
    return this._filter;
  }
  public set filter(v: any[]) {
    if (v != this._filter) {
      this._filter = v;
      //this.gridApi.setFilterModel(this._filter);
      //this.gridApi.onFilterChanged();
      this._filter.forEach(f => {
        debugger;
        let fc = this.gridApi.getFilterInstance(f.field);
        if (fc) {
          let ff = fc.getFrameworkComponentInstance();
          ff.setModel(f);
        }
      });
    }
  }




  rowModelType = "clientSide";
  rowGroupPanelShow = "always";


  private remoteOperation: boolean = false;



  onGridReady(gridOptions: GridOptions) {
    this.gridApi = gridOptions.api;
    const that = this;

    //
    if (that.remoteOperation) {
      let dataSource = {
        rowCount: null,
        getRows: function (params) {
          that.dataSourceSuccessCallback = params.successCallback;
          console.log("grid filter", params);
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
          that.dataSource.fetch(loadParams);
        }
      };
      gridOptions.api.setDatasource(dataSource);
    }
    else {
      this.dataSource.fetch();
    }
  }


  fullWidthCellRendererFramework: any;
  fullWidthCellRendererParams: any;
  frameworkComponents: any = {};
  isFullWidthCell: Function;

  ngAfterContentInit(): void {
    if (this.rowTemplate) {
      this.fullWidthCellRendererFramework = this.rowTemplate.renderer;
      this.fullWidthCellRendererParams = this.rowTemplate.params;
    }
    let that = this;
    this.isFullWidthCell = function () {
      return that.rowTemplate != null;
    }

  }


  ngAfterViewInit(): void {
    this.remoteOperation = (<any>this.dataSource.read).remoteOperation;
    if (this.remoteOperation)
      this.rowModelType = "infinite";

    this.mapColumns();
    //
    this.dataSource.onDataReceived.subscribe(c => {
      if (this.remoteOperation && this.dataSourceSuccessCallback) {
        this.dataSourceSuccessCallback(c, c.length);
      }
      else {
        this.gridApi.setRowData(c)
      }
    });
    //
    if (this.searchInput) {
      this.searchInput.onTextChanged.subscribe(c => {
        this.searchText = c;
      })
    }
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






  onGridCellClicked(e: CellClickedEvent) {
    this.cellClick.emit(this.mapCellEvent(e));
  }

  onGridCellDoubleClicked(e: CellClickedEvent) {
    this.cellDbClick.emit(this.mapCellEvent(e));
  }

  onGridCellFocused(e: CellClickedEvent) {
    this.cellFocuse.emit(this.mapCellEvent(e));
  }

  onGridRowClicked(e: RowClickedEvent) {
    this.rowClick.emit(this.mapRowEvent(e));
  }

  onGridRowDoubleClicked(e: CellClickedEvent) {
    this.rowDbClick.emit(this.mapRowEvent(e));
  }

  onGridSelectionChanged(e) {
    let args: AXGridRowSelectionEvent = { items: [] };
    let nodes = this.gridApi.getSelectedNodes();
    nodes.forEach(i => {
      args.items.push({
        rowLevel: i.level,
        rowIndex: i.rowIndex,
        data: i.data
      })
    });
    this.selectionChanged.emit(args);
  }


  private mapCellEvent(e: CellEvent): AXGridCellEvent {
    return {
      rowLevel: 0,
      column: e.column,
      data: e.data,
      rowIndex: e.rowIndex,
      value: e.value
    };
  }

  private mapRowEvent(e: RowEvent): AXGridRowEvent {
    return {
      rowLevel: 0,
      data: e.data,
      rowIndex: e.rowIndex,
    };
  }
}
