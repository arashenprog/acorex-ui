import { ContentChild } from "@angular/core";
import { AXDataSourceComponent, AXDataSourceReadParams } from "../../datasource/api";

export abstract class AXDataListComponent {
  items: any[] = [];

  @ContentChild(AXDataSourceComponent)
  private dataSource: AXDataSourceComponent;

  ngOnInit(): void {

    this.dataSource.onDataReceived.subscribe(data => {
      this.dataReceived(data);
    });
  }

  private dataReceived(data: any) {
    this.items = data;
  }

  fetch(params: AXDataSourceReadParams = {}) {
    this.dataSource.fetch(params);
  }
}
