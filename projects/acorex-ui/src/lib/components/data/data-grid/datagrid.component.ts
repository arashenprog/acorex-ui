import { Component, OnInit, ContentChild, Input, ContentChildren, QueryList, EventEmitter, Output, TemplateRef } from "@angular/core";
import { AXDataSourceComponent } from '../data-source/datasource.component';
import { AXGridDataColumn } from './columns/column.component';
import { AXDataSourceReadParams } from '../data-source/read-param';
import { GridOptions, CellClickedEvent, RowClickedEvent, CellEvent, RowEvent } from 'ag-grid-community';
import { ViewEncapsulation } from '@angular/core';
import { AXGridCellEvent, AXGridRowEvent, AXGridRowSelectionEvent, AXGridRowParams } from './datagrid.events';
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

  gridOptions: GridOptions;
  private gridApi;
  private dataSourceSuccessCallback;
  columnDefs: any[] = [];
  rowModelType = "clientSide";
  rowGroupPanelShow = "always";
  private remoteOperation: boolean = false;
  fullWidthCellRendererFramework: any;
  fullWidthCellRendererParams: any;
  frameworkComponents: any = {};
  isFullWidthCell: Function;

  internalHeight: string = "100%";



  @Input()
  loadOnInit: boolean = true;

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
        ;
        let fc = this.gridApi.getFilterInstance(f.field);
        if (fc) {
          let ff = fc.getFrameworkComponentInstance();
          ff.setModel(f);
        }
      });
    }
  }

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



  @Input()
  rowClass?: (params: AXGridRowParams) => (string | string[]) | (string | string[]);


  constructor() {

  }








  private calcHeight(): void {
    if (this.toolbar)
      this.internalHeight = `calc(100% - ${40}px)`;
    else
      this.internalHeight = '100%';
  }












  internalGridReady(gridOptions: GridOptions) {
    this.gridApi = gridOptions.api;
    //   
    if (!this.loadOnInit)
      return;
    const that = this;
    //
    if (that.remoteOperation) {
      let dataSource = {
        rowCount: null,
        getRows: function (params) {
          that.dataSourceSuccessCallback = params.successCallback;
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
    //


  }




  ngAfterContentInit(): void {
    let that = this;
    //
    if (this.rowTemplate) {
      this.fullWidthCellRendererFramework = this.rowTemplate.renderer;
      this.fullWidthCellRendererParams = this.rowTemplate.params;
    }

    this.isFullWidthCell = function () {
      return that.rowTemplate != null;
    }
  }


  ngAfterViewInit(): void {
    let that = this;
    //
    this.remoteOperation = (<any>this.dataSource.read).remoteOperation;
    if (this.remoteOperation)
      this.rowModelType = "infinite";

    this.mapColumns();
    //
    this.dataSource.onDataReceived.subscribe(c => {
      ;
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
    //
    this.calcHeight();
    //

  }

  mapColumns() {
    this.columnDefs = this._columns.map(c => c.render());
  }


  refresh() {
    this.loadOnInit = true;
    if (this.remoteOperation) {
      this.gridApi.refreshView();
    }
    else {
      this.dataSource.fetch();
    }
  }






  internalGridCellClicked(e: CellClickedEvent) {
    this.cellClick.emit(this.mapCellEvent(e));
  }

  internalGridCellDoubleClicked(e: CellClickedEvent) {
    this.cellDbClick.emit(this.mapCellEvent(e));
  }

  internalGridCellFocused(e: CellClickedEvent) {
    this.cellFocuse.emit(this.mapCellEvent(e));
  }

  internalGridRowClicked(e: RowClickedEvent) {
    this.rowClick.emit(this.mapRowEvent(e));
  }

  internalGridRowDoubleClicked(e: CellClickedEvent) {
    this.rowDbClick.emit(this.mapRowEvent(e));
  }

  internalGridSelectionChanged(e) {
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


  internalGetRowClass = (p: any) => {
    if (this.rowClass) {
      if (this.rowClass instanceof Function) {
        return this.rowClass({
          rowIndex: p.node.rowIndex,
          rowLevel: p.node.level,
          data: p.data,
        });
      }
      else {
        return this.rowClass;
      }
    }
  }
}
