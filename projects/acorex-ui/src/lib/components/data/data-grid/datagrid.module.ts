import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AXDataGridComponent } from "./datagrid.component";
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';
import { AXDataSourceModule } from '../data-source/datasource.module';
import { AXGridTextColumn, TextFilterRenderer } from './columns/text-column.component';
import { AXGridCheckColumn, BooleanRenderer, BooleanFilterRenderer } from './columns/check-column.component';
import { AXCoreModule } from '../../../core/core.module';
import { AXGridSelectionColumn } from './columns/selection-column.component';
import { CommandRenderer, AXGridCommandColumn } from './columns/command-column.component';
import { AXDataGridFilterComponent } from './filters/filter.component';
import { AXTextBoxModule } from '../../form/text-box/text-box.module';
import { AXCheckBoxModule } from '../../form/checkbox/checkbox.module';
import { AXSelectBoxModule } from '../../form/select-box/select-box.module';
import { AXButtonModule } from '../../form/button/button.module';
import { DateRenderer, AXGridDateColumn } from "./columns/date-column.component";
import { AXDataGridRowTemplateComponent, AXDataGridRowTemplateRenderer } from './templates/row-template.component'
import { AXDataGridCellTemplateComponent, AXDataGridCellTemplateRenderer } from './templates/cell-template.component'

@NgModule({
  declarations: [
    AXDataGridComponent,
    AXGridTextColumn,
    AXGridCheckColumn,
    AXGridSelectionColumn,
    AXGridDateColumn,
    AXGridCommandColumn,
    BooleanRenderer,
    BooleanFilterRenderer,
    DateRenderer,
    TextFilterRenderer,
    AXDataGridFilterComponent,
    AXDataGridRowTemplateComponent,
    AXDataGridRowTemplateRenderer,
    AXDataGridCellTemplateComponent,
    AXDataGridCellTemplateRenderer,
    CommandRenderer],
  imports: [
    CommonModule,
    AXCoreModule,
    FormsModule,
    AgGridModule,
    AXTextBoxModule,
    AXCheckBoxModule,
    AXSelectBoxModule,
    AXDataSourceModule,
    AXButtonModule
  ],
  exports: [
    AXDataGridComponent,
    AXDataGridFilterComponent,
    AXDataGridRowTemplateComponent,
    AXDataGridRowTemplateRenderer,
    AXDataGridCellTemplateComponent,
    AXDataGridCellTemplateRenderer,
    AXGridTextColumn,
    AXGridCheckColumn,
    AXGridDateColumn,
    AXGridSelectionColumn,
    AXGridCommandColumn,
    BooleanRenderer,
    BooleanFilterRenderer,
    DateRenderer,
    CommandRenderer
  ],
  entryComponents: [
    BooleanRenderer,
    DateRenderer,
    BooleanFilterRenderer,
    CommandRenderer,
    TextFilterRenderer,
    AXDataGridRowTemplateComponent,
    AXDataGridRowTemplateRenderer,
    AXDataGridCellTemplateComponent,
    AXDataGridCellTemplateRenderer,
  ],
  providers: []
})
export class AXDataGridModule { }
