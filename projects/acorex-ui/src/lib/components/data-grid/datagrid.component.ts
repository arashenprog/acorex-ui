import { Component, OnInit, ViewEncapsulation, ContentChild, Input, ContentChildren, QueryList, ChangeDetectionStrategy } from "@angular/core";
import { AXDataSourceComponent } from '../datasource/datasource.component';
import { AXGridDataColumn } from './column.component';

@Component({
  selector: "ax-data-grid",
  templateUrl: "./datagrid.component.html",
  styleUrls: ["./datagrid.component.scss"]
})
export class AXDataGridComponent implements OnInit {
  constructor() { }

  @ContentChildren(AXGridDataColumn)
  private _columns: QueryList<AXGridDataColumn>;

  @ContentChild(AXDataSourceComponent)
  private dataSource: AXDataSourceComponent;

  @Input()
  title: string;

  columnDefs = [];

  searchText: string = "";

  rowData = [];

  ngOnInit(): void {

    //
    this.dataSource.onLoad.subscribe(c => {
      this.rowData = c;
    })
  }

  ngAfterViewInit(): void {
    this.mapColumns();
  }

  mapColumns() {
    this.columnDefs = this._columns.map(c => {
      const col: any = {
        field: c.field,
        width: c.width,
      };
      if (c.caption)
        col.headerName = c.caption;
      if (c.minWidth)
        col.minWidth = c.minWidth;
      if (c.maxWidth)
        col.maxWidth = c.maxWidth;
      if (c.pinned)
        col.pinned = c.pinned;
      if (c.sortable)
        col.sortable = c.sortable;
      if (c.sort)
        col.sort = c.sort;
      if (c.renderer)
        col.cellRendererFramework = c.renderer;
      return col;
    });
  }


  refresh() {
    this.dataSource.refresh();
  }

  onSearch(e) { }
}
