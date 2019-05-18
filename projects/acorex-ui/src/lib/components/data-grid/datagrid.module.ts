import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AXDataGridComponent } from "./datagrid.component";
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { AXDataSourceModule } from '../datasource/datasource.module';
import { AXGridTextColumn, TextFilterRenderrer } from './columns/text-column.component';
import { AXGridCheckColumn, BooleanRenderer, BooleanFilterRenderrer } from './columns/check-column.component';
import { AXCoreModule } from '../../core/core.module';
import { AXGridSelectionColumn } from './columns/selection-column.component';
import { CommandRenderer, AXGridCommandColumn } from './columns/command-column.component';
import { AXDataGridFilterComponent } from './filters/filter.component';
import { AXTextBoxModule } from '../form/text-box/text-box.module';
import { AXCheckBoxModule } from '../form/checkbox/checkbox.module';
import { AXSelectBoxModule } from '../form/select-box/select-box.module';

@NgModule({
  declarations: [
    AXDataGridComponent,
    AXGridTextColumn,
    AXGridCheckColumn,
    AXGridSelectionColumn,
    AXGridCommandColumn,
    BooleanRenderer,
    BooleanFilterRenderrer,
    TextFilterRenderrer,
    AXDataGridFilterComponent,
    CommandRenderer],
  imports: [
    CommonModule,
    AXCoreModule,
    FormsModule,
    AgGridModule,
    AXTextBoxModule,
    AXCheckBoxModule,
    AXSelectBoxModule,
    AXDataSourceModule
  ],
  exports: [
    AXDataGridComponent,
    AXDataGridFilterComponent,
    AXGridTextColumn,
    AXGridCheckColumn,
    AXGridSelectionColumn,
    AXGridCommandColumn,
    BooleanRenderer,
    BooleanFilterRenderrer,
    CommandRenderer
  ],
  entryComponents: [
    BooleanRenderer,
    BooleanFilterRenderrer,
    CommandRenderer,
    TextFilterRenderrer
  ],
  providers: []
})
export class AXDataGridModule { }
