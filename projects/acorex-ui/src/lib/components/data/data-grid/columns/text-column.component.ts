import { AXGridDataColumn } from "./column.component";
import {
  ChangeDetectionStrategy,
  Component,
  ViewContainerRef,
  ViewChild
} from "@angular/core";
import {
  IFilterParams,
  RowNode,
  IDoesFilterPassParams,
  IAfterGuiAttachedParams
} from "ag-grid-community";
import { IFilterAngularComp } from 'ag-grid-angular';

import { AXTextBoxComponent } from '../../../form/text-box/text-box.component'

@Component({
  selector: "ax-text-column",
  template: "",
  providers: [{ provide: AXGridDataColumn, useExisting: AXGridTextColumn }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXGridTextColumn extends AXGridDataColumn {
  constructor() {
    super();
  }

  render() {
    let col = super.render();
    col.filterFramework = TextFilterRenderer;
    return col;
  }
}

@Component({
  template: `
    <ax-data-grid-filter>
      <ax-text-box label="Filter" showClear="true" (textChange)="onChange($event)">
      </ax-text-box>
    </ax-data-grid-filter>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextFilterRenderer implements IFilterAngularComp {
  public value?: string = null;
  private params: IFilterParams;
  private valueGetter: (rowNode: RowNode) => any;
  @ViewChild(AXTextBoxComponent)
  private input: AXTextBoxComponent;

  agInit(params: IFilterParams): void {
    this.params = params;
    this.valueGetter = params.valueGetter;
  }

  isFilterActive(): boolean {
    return this.value !== null && this.value !== undefined;
  }

  doesFilterPass(params: IDoesFilterPassParams): boolean {
    return this.value == this.valueGetter(params.node);
  }

  getModel(): any {
    return { value: this.value, hi: "arash" };
  }

  setModel(model: any): void {
    ;
    this.onChange(model ? model.value : null);
  }

  ngAfterViewInit(params: IAfterGuiAttachedParams): void {
    window.setTimeout(() => {
      this.input.focus();
    });
  }

  onChange(newValue): void {
    if (this.value !== newValue) {
      this.value = newValue;
      if (this.value == "")
        this.value = null;
      this.params.filterChangedCallback();
    }
  }
}
