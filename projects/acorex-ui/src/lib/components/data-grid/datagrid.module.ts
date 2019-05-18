import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AXDataGridComponent } from "./datagrid.component";
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { AXDataSourceModule } from '../datasource/datasource.module';
import { AXGridTextColumn } from './columns/text-column.component';
import { AXGridCheckColumn, BooleanRenderer, BooleanFilterRenderrer } from './columns/check-column.component';
import { AXCoreModule } from '../../core/core.module';
import { AXGridSelectionColumn } from './columns/selection-column.component';
import { CommandRenderer, AXGridCommandColumn } from './columns/command-column.component';
@NgModule({
  declarations: [
    AXDataGridComponent,
    AXGridTextColumn,
    AXGridCheckColumn,
    AXGridSelectionColumn,
    AXGridCommandColumn,
    BooleanRenderer,
    BooleanFilterRenderrer,
    CommandRenderer],
  imports: [
    CommonModule,
    AXCoreModule,
    FormsModule,
    AgGridModule,
    AXDataSourceModule],
  exports: [
    AXDataGridComponent,
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
    CommandRenderer
  ],
  providers: []
})
export class AXDataGridModule { }
