import { Component, OnInit, ContentChild, Input, ContentChildren, QueryList, EventEmitter, Output } from "@angular/core";
import { AXDataSourceComponent } from '../datasource/datasource.component';
import { AXGridDataColumn } from './columns/column.component';
import { AXDataSourceReadParams } from '../datasource/read-param';
import { GridOptions, CellClickedEvent, RowClickedEvent, CellEvent, RowEvent } from 'ag-grid-community';
import { ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AXGridCellEvent, AXGridRowEvent, AXGridRowSelectionEvent } from './events.class';


@Component({
  selector: "ax-data-grid",
  templateUrl: "./datagrid.component.html",
  styleUrls: ["./datagrid.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class AXDataGridComponent implements OnInit {


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


  constructor() { }

  private gridApi;
  private dataSourceSuccessCallback;

  @ContentChildren(AXGridDataColumn)
  private _columns: QueryList<AXGridDataColumn>;

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

  searchChangeObserver: any;

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

  ngOnInit(): void {


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



  onSearchChanged(text: string) {
    if (!this.searchChangeObserver) {
      Observable.create(observer => {
        this.searchChangeObserver = observer;
      })
        .pipe(debounceTime(500))
        .pipe(distinctUntilChanged())
        .subscribe(c => {
          this.searchText = c;
        });
    }

    this.searchChangeObserver.next(text);
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
        rowLevel:i.level,
        rowIndex: i.rowIndex,
        data: i.data
      })
    });
    this.selectionChanged.emit(args);
  }


  private mapCellEvent(e: CellEvent): AXGridCellEvent {
    return {
      rowLevel:0,
      column: e.column,
      data: e.data,
      rowIndex: e.rowIndex,
      value: e.value
    };
  }

  private mapRowEvent(e: RowEvent): AXGridRowEvent {
    return {
      rowLevel:0,
      data: e.data,
      rowIndex: e.rowIndex,
    };
  }
}
