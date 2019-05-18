import { AXGridDataColumn } from "./column.component";
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  EventEmitter,
  ViewEncapsulation
} from "@angular/core";
import { MenuItem } from "../../../core/menu.class";
import { ICellRendererAngularComp } from "ag-grid-angular/dist/interfaces";
import { ICellRendererParams } from "ag-grid-community";

@Component({
  selector: "ax-command-column",
  template: "",
  providers: [{ provide: AXGridDataColumn, useExisting: AXGridCommandColumn }],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation:ViewEncapsulation.None
})
export class AXGridCommandColumn extends AXGridDataColumn {
  @Input()
  items: MenuItem[] = [];

  // onCommand: EventEmitter<AXGridRowCommandEvent> = new EventEmitter<AXGridRowCommandEvent>();

  render() {
    let col = super.render();
    col.cellRendererFramework = CommandRenderer;
    col.valueGetter = params => {
      return this.items;
    };
    return col;
  }
}

@Component({
  template: `
  <ax-button *ngFor="let bt of items" type="{{bt.type}}">{{ bt.text }}</ax-button>

  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommandRenderer implements ICellRendererAngularComp {
  items: MenuItem[] = [];
  constructor() {}

  agInit(params: ICellRendererParams): void {
    this.items = params.value;
  }

  refresh(params: ICellRendererParams): boolean {
    this.items = params.value;
    return true;
  }
}
