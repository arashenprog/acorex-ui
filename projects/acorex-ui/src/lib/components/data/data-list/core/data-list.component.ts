import { ContentChild, Input, Directive } from "@angular/core";
import { AXDataSourceComponent, AXDataSourceReadParams } from "../../data-source/api";
import { AXBaseComponent } from "../../../../core/base.class";

@Directive()
export abstract class AXDataListComponent extends AXBaseComponent {

  @Input()
  items: any[] = [];
  @ContentChild(AXDataSourceComponent, /* TODO: add static flag */ {})
  private dataSource: AXDataSourceComponent;




  ngOnInit(): void {
    if (this.dataSource) {
      this.dataSource.onDataReceived.subscribe(data => {
        this.dataReceived(data);
      });
    }
  }

  private dataReceived(data: any) {
    this.items = data;
  }

  private params: AXDataSourceReadParams = {};

  fetch(params: AXDataSourceReadParams = {}) {
    this.params = params;
    if (this.dataSource) {
      this.dataSource.fetch(params);
    }
  }

  refresh() {
    this.fetch(this.params);
  }
}
