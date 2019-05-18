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
    col.filterFramework = TextFilterRenderrer;
    return col;
  }
}

@Component({
  template: `
    <div class="ax-grid-filter-container">
      <ax-text-box label="Filter" showClear="true">
      </ax-text-box>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextFilterRenderrer implements IFilterAngularComp {
  public value?: boolean = null;
  private params: IFilterParams;
  private valueGetter: (rowNode: RowNode) => any;
  @ViewChild("input", { read: ViewContainerRef }) public input;

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
    this.value = model ? model.value : null;
  }

  ngAfterViewInit(params: IAfterGuiAttachedParams): void {
    window.setTimeout(() => {
      this.input.element.nativeElement.focus();
    });
  }

  onChange(newValue): void {
    if (this.value !== newValue) {
      this.value = newValue;
      this.params.filterChangedCallback();
    }
  }
}
