import {
  Component,
  OnInit,
  ContentChild,
  Input,
  ContentChildren,
  QueryList,
  EventEmitter,
  Output,
  TemplateRef
} from "@angular/core";
import { AXDataSourceComponent } from "../data-source/datasource.component";
import { AXGridDataColumn } from "./columns/column.component";
import { AXDataSourceReadParams } from "../data-source/read-param";
import {
  GridOptions,
  CellClickedEvent,
  RowClickedEvent,
  CellEvent,
  RowEvent
} from "ag-grid-community";
import { ViewEncapsulation } from "@angular/core";
import {
  AXGridCellEvent,
  AXGridRowEvent,
  AXGridRowSelectionEvent,
  AXGridRowParams
} from "./datagrid.events";
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
  @Input()
  public remoteOperation: boolean = false;
  fullWidthCellRendererFramework: any;
  fullWidthCellRendererParams: any;
  frameworkComponents: any = {};
  isFullWidthCell: Function;
  internalHeight: string = "100%";

  @Input()
  selectionMode: "single" | "multiple" = "single";

  @Input()
  rowGroupPanelShow = "always";

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
      if (this.gridApi) this.gridApi.setQuickFilter(this.searchText);
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
        let fc = this.gridApi.getFilterInstance(f.field);
        if (fc) {
          let ff = fc.getFrameworkComponentInstance();
          ff.setModel(f);
        }
      });
    }
  }

  @ContentChildren(AXGridDataColumn)
  private _inlineColumns: QueryList<AXGridDataColumn>;

  @Output()
  columnsChange: EventEmitter<AXGridDataColumn[]> = new EventEmitter<AXGridDataColumn[]>();

  private _columns: AXGridDataColumn[] = [];

  @Input()
  public get columns(): AXGridDataColumn[] {
    return this._inlineColumns ? [...this._columns, ...this._inlineColumns.toArray()] : this._columns;
  }

  public set columns(val: AXGridDataColumn[]) {
    if (val && val.length) {
      this._columns = val;
      this.columnsChange.emit(val);
    }
  }

  @ContentChild(AXToolbarSearchComponent, { static: true })
  searchInput: AXToolbarSearchComponent;

  @ContentChild(AXToolbarComponent, { static: true })
  toolbar: AXToolbarComponent;

  @ContentChild(AXDataGridRowTemplateComponent, { static: true })
  rowTemplate: AXDataGridRowTemplateComponent;



  @ContentChild(AXDataSourceComponent, { static: true })
  private _contentDataSource: AXDataSourceComponent;


  private _dataSource: AXDataSourceComponent;

  @Input()
  public get dataSource(): AXDataSourceComponent {
    return this._dataSource ? this._dataSource : this._contentDataSource;
  }

  public set dataSource(v: AXDataSourceComponent) {
    this._dataSource = v;
    // this.dataSourceChange.emit(v);
  }




  @Output()
  cellClick: EventEmitter<AXGridCellEvent> = new EventEmitter<
    AXGridCellEvent
  >();
  @Output()
  cellDbClick: EventEmitter<AXGridCellEvent> = new EventEmitter<
    AXGridCellEvent
  >();
  @Output()
  cellFocuse: EventEmitter<AXGridCellEvent> = new EventEmitter<
    AXGridCellEvent
  >();
  @Output()
  rowClick: EventEmitter<AXGridRowEvent> = new EventEmitter<AXGridRowEvent>();

  @Output()
  rowDbClick: EventEmitter<AXGridRowEvent> = new EventEmitter<AXGridRowEvent>();
  @Output()
  selectionChanged: EventEmitter<AXGridRowSelectionEvent> = new EventEmitter<
    AXGridRowSelectionEvent
  >();

  @Input()
  rowClass?: (
    params: AXGridRowParams
  ) => (string | string[]) | (string | string[]);

  @Input()
  rtl: boolean = false;

  constructor() { }

  private calcHeight(): void {
    if (this.toolbar) this.internalHeight = `calc(100% - ${40}px)`;
    else this.internalHeight = "100%";
  }


  private get intenalGridDataSource() {

    let that = this;
    return {
      rowCount: null,
      getRows: function (params) {
        that.dataSourceSuccessCallback = params.successCallback;
        let loadParams: AXDataSourceReadParams = {};
        loadParams.searchText = that.searchText;
        loadParams.skip = params.request.startRow;
        loadParams.take = params.request.endRow - params.request.startRow;
        
        loadParams.sort = params.request.sortModel.map(c => {
          return {
            field: c.colId,
            sort: c.sort
          };
        });
        loadParams.groups = params.request.rowGroupCols.map(r => { return r.field });

        loadParams.groupKeys = params.request.groupKeys;
        loadParams.filter = params.request.filterModel;
        // loadParams.groups = params.request.rowGroupCols;
        that.dataSource.fetch(loadParams);
      }
    };
  }

  internalGridReady(gridOptions: GridOptions) {
    this.gridApi = gridOptions.api;
    //    
    this.mapColumns();
    //
    this.calcHeight();
    //
    if (this.remoteOperation) {
      this.gridApi.setServerSideDatasource(this.intenalGridDataSource);
    }
    //
    if (!this.loadOnInit) return;
    this.refresh();
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
    };
  }

  ngOnInit(): void {
    if (this.remoteOperation)
      this.rowModelType = "serverSide";
  }

  ngAfterViewInit(): void {
    let that = this;
    this.enableRTL();
    //
    this.dataSource.onDataReceived.subscribe(data => {
      this.hideLoading();
      let items: any[];
      let totalCount: number;
      if (Array.isArray(data)) {
        items = data;
        totalCount = data.length;
      }
      else {
        items = data.items;
        totalCount = data.totalCount;
      }
      if (this.dataSourceSuccessCallback) {
        if (!this.loadOnInit)
          this.dataSourceSuccessCallback([], 0);
        else
          this.dataSourceSuccessCallback(items, totalCount);
      } else {
        if (!this.loadOnInit)
          this.gridApi.setRowData([]);
        else
          this.gridApi.setRowData(items);
      }
    });
    this.dataSource.onFetchStart.subscribe(() => {
      this.showLoading();
    });
    //
    if (this.searchInput) {
      this.searchInput.onTextChanged.subscribe(c => {
        this.searchText = c;
      });
    }

  }

  mapColumns() {
    this.columnDefs = this.columns.map(c => c.render());
  }

  enableRTL() {
    let body = document.querySelector("body");
    if (this.rtl == false) {
      body.classList.forEach(c => {
        if (c == "rtl") {
          this.rtl = true;
        }
      });
    }
  }

  refresh() {
    this.loadOnInit = true;
    if (this.remoteOperation) {
      this.gridApi.purgeServerSideCache([]);
    } else {
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
      });
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
      rowIndex: e.rowIndex
    };
  }

  internalGetRowClass = (p: any) => {
    if (this.rowClass) {
      if (this.rowClass instanceof Function) {
        return this.rowClass({
          rowIndex: p.node.rowIndex,
          rowLevel: p.node.level,
          data: p.data
        });
      } else {
        return this.rowClass;
      }
    }
  };



  showLoading(): void {
    this.gridApi.showLoadingOverlay();
  }

  hideLoading(): void {
    this.gridApi.hideOverlay();
  }
}
