
import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  ViewContainerRef
} from "@angular/core";
import { AXGridDataColumn } from "./column.component";
import { ICellRendererAngularComp, IFilterAngularComp } from "ag-grid-angular";
import {
  ICellRendererParams,
  IFilterParams,
  RowNode,
  IDoesFilterPassParams,
  IAfterGuiAttachedParams
} from "ag-grid-community";
import { AXDateTime } from "../../../../core/calendar/datetime";

@Component({
  selector: "ax-date-column",
  template: "",
  providers: [{ provide: AXGridDataColumn, useExisting: AXGridDateColumn }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXGridDateColumn extends AXGridDataColumn {
  constructor() {
    super();
  }

  render() {
    let col = super.render();
    col.cellRendererFramework = DateRenderer;
    //col.filterFramework = DateFilterRenderer;
    return col;
  }
}

@Component({
  template: `
    {{ value | dt:"YYYY-MM-DD"}}
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateRenderer implements ICellRendererAngularComp {
  value: AXDateTime;
  constructor() {}
  agInit(params: ICellRendererParams): void {
    this.value = params.value;
  }
  refresh(params: ICellRendererParams): boolean {
    this.value = params.value;
    return true;
  }
}

// @Component({
//   template: `
//     <ax-data-grid-filter>
//       <ax-select-box
//         label="Select Box"
//         [items]="selectItem"
//       ></ax-select-box>
//     </ax-data-grid-filter>
//   `,
//   changeDetection: ChangeDetectionStrategy.OnPush
// })
// export class DateFilterRenderer implements IFilterAngularComp {
//   public value?: boolean = null;
//   private params: IFilterParams;
//   private valueGetter: (rowNode: RowNode) => any;
//   @ViewChild("input", { read: ViewContainerRef }) public input;

//   selectItem = [
//     { value: 0, label: "True" },
//     { value: 1, label: "False" },
//   ];
//   agInit(params: IFilterParams): void {
//     this.params = params;
//     this.valueGetter = params.valueGetter;
//   }

//   isFilterActive(): boolean {
//     return this.value !== null && this.value !== undefined;
//   }

//   doesFilterPass(params: IDoesFilterPassParams): boolean {
//     return this.value == this.valueGetter(params.node);
//   }

//   getModel(): any {
//     return { value: this.value, hi: "arash" };
//   }

//   setModel(model: any): void {
//     this.value = model ? model.value : null;
//   }

//   ngAfterViewInit(params: IAfterGuiAttachedParams): void {
//     window.setTimeout(() => {
//       this.input.element.nativeElement.focus();
//     });
//   }

//   onChange(newValue): void {
//     if (this.value !== newValue) {
//       this.value = newValue;
//       this.params.filterChangedCallback();
//     }
//   }
// }