import { ContentChild, Input } from "@angular/core";
import { AXDataSourceComponent, AXDataSourceReadParams } from "../../data-source/api";
import { AXBaseComponent } from "../../../../core/base.class";

export abstract class AXDataListComponent extends AXBaseComponent {

  @Input()
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

  private params: AXDataSourceReadParams = {};

  fetch(params: AXDataSourceReadParams = {}) {
    this.dataSource.fetch(params);
    this.params = params;
  }

  refresh() {
    this.fetch(this.params);
  }
}
