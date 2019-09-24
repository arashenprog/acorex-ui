import { AXGridDataColumn } from "./column.component";
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  EventEmitter,
  ViewEncapsulation,
  Output
} from "@angular/core";
import { MenuItem } from "../../../../core/menu.class";
import { ICellRendererAngularComp } from "ag-grid-angular/dist/interfaces";
import { ICellRendererParams } from "ag-grid-community";
import { AXGridRowCommandEvent } from "../events.class";

@Component({
  selector: "ax-command-column",
  template: "",
  providers: [{ provide: AXGridDataColumn, useExisting: AXGridCommandColumn }],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AXGridCommandColumn extends AXGridDataColumn {
  @Input()
  items: MenuItem[] = [];

  @Output()
  itemClick: EventEmitter<AXGridRowCommandEvent> = new EventEmitter<AXGridRowCommandEvent>();

  render() {
    let col = super.render();
    if (!col.cellRendererFramework)
      col.cellRendererFramework = CommandRenderer;
    col.cellRendererParams = {
      items: this.items,
      onClick: e => {
        this.itemClick.emit({
          command: e.name,
          data: e.data,
          rowIndex: e.rowIndex,
          rowLevel: e.rowLevel
        });
      }
    };
    col.sortable = false;
    col.filter = false;
    col.valueGetter = params => {
      return this.items;
    };
    return col;
  }
}

@Component({
  selector: "ax-command-cell",
  template: `
    <button
      class="btn-light ax-grid-command-button"
      *ngFor="let bt of items"
      type="button"
      [title]="bt.tooltip"
      (click)="onClick(bt)"
    >
      <i [ngClass]="bt.icon"></i>{{ bt.text }}
    </button>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommandRenderer implements ICellRendererAngularComp {
  items: MenuItem[] = [];
  node: any;
  private clickCallback: Function;

  constructor() { }

  agInit(params: ICellRendererParams): void {
    this.mapParams(params);
  }

  refresh(params: ICellRendererParams): boolean {
    this.mapParams(params);
    return true;
  }

  private mapParams(params: any) {
    this.node = params.node;
    this.items = params.items;
    this.clickCallback = params.onClick;
  }

  onClick(item: MenuItem) {
    if (this.clickCallback)
      this.clickCallback({
        name: item.name,
        rowLevel: this.node.level,
        rowIndex: this.node.rowIndex,
        data: this.node.data
      });
  }
}
