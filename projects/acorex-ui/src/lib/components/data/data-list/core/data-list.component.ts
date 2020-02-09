import { ContentChild, Input, Directive, EventEmitter, Output } from "@angular/core";
import { AXDataSourceComponent, AXDataSourceReadParams } from "../../data-source/api";
import { AXBaseComponent } from "../../../../core/base.class";

@Directive()
export abstract class AXDataListComponent extends AXBaseComponent {


  @Output()
  itemsChange: EventEmitter<any[]> = new EventEmitter<any[]>();

  private _items: any[];

  @Input()
  public get items(): any[] {
    return this._items;
  }
  public set items(v: any[]) {
    this._items = v;
    this.itemsChange.emit(v);
  }




  @ContentChild(AXDataSourceComponent, { static: true })
  protected dataSource: AXDataSourceComponent;




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
