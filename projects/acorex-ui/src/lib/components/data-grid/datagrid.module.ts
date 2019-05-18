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

@NgModule({
  declarations: [
    AXDataGridComponent,
    AXGridTextColumn,
    AXGridCheckColumn,
    BooleanRenderer,
    BooleanFilterRenderrer,
    TextFilterRenderrer,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AgGridModule,
    AXDataSourceModule,
    AXTextBoxModule

  ],
  exports: [
    AXDataGridComponent,
    AXGridTextColumn,
    AXGridCheckColumn,
    BooleanRenderer,
    BooleanFilterRenderrer,
    TextFilterRenderrer
  ],
  entryComponents: [
    BooleanRenderer,
    BooleanFilterRenderrer,
    TextFilterRenderrer
  ],
  providers: []
})
export class AXDataGridModule {}
