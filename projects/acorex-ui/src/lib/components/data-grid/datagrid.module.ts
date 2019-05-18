import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AXDataGridComponent } from "./datagrid.component";
import { FormsModule } from "@angular/forms";
import { AgGridModule } from "ag-grid-angular";
import { AXDataSourceModule } from "../datasource/datasource.module";

import {
  AXGridTextColumn,
  TextFilterRenderrer
} from "./columns/text-column.component";
import {
  AXGridCheckColumn,
  BooleanRenderer,
  BooleanFilterRenderrer
} from "./columns/check-column.component";
import { AXTextBoxModule } from '../form/text-box/text-box.module';
import { AXDataGridFilterComponent } from './filters/filter.component';
import { AXSelectBoxModule } from '../form/select-box/select-box.module';
import { AXCheckBoxModule } from '../form/checkbox/checkbox.module';

@NgModule({
  declarations: [
    AXDataGridComponent,
    AXGridTextColumn,
    AXGridCheckColumn,
    BooleanRenderer,
    BooleanFilterRenderrer,
    TextFilterRenderrer,
    AXDataGridFilterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AgGridModule,
    AXDataSourceModule,
    AXTextBoxModule,
    AXSelectBoxModule,
    AXCheckBoxModule

  ],
  exports: [
    AXDataGridComponent,
    AXGridTextColumn,
    AXGridCheckColumn,
    BooleanRenderer,
    BooleanFilterRenderrer,
    TextFilterRenderrer,
    AXDataGridFilterComponent
  ],
  entryComponents: [
    BooleanRenderer,
    BooleanFilterRenderrer,
    TextFilterRenderrer
  ],
  providers: []
})
export class AXDataGridModule {}
