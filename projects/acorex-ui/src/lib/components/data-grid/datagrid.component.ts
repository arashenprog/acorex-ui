import { Component, OnInit, ViewEncapsulation, ContentChild, Input } from "@angular/core";
import { AXDataSourceComponent } from '../datasource/datasource.component';
// import { HttpService } from "../../services/HttpService";

@Component({
  selector: "ax-data-grid",
  templateUrl: "./datagrid.component.html",
  styleUrls: ["./datagrid.component.scss"]
})
export class AXDataGridComponent implements OnInit {
  constructor() { }

  @ContentChild(AXDataSourceComponent)
  private dataSource: AXDataSourceComponent;

  @Input()
  title:string;

  columnDefs = [
    { headerName: "title", field: "title", width: 100 }
  ];

  searchText: string = "";

  rowData = [];

  ngOnInit(): void {
    this.dataSource.onLoad.subscribe(c => {
      this.rowData = c;
    })
  }

  ngAfterViewInit(): void {
    
  }


  refresh(){
    this.dataSource.refresh();
  }

  onSearch(e) { }
}
