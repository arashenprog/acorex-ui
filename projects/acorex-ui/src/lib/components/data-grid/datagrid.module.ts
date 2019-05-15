import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AXDataGridComponent } from "./datagrid.component";
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { AXDataSourceModule } from '../datasource/datasource.module';
import { AXGridTextColumn, AXGridCheckColumn, BooleanRenderer } from './column.component';
@NgModule({
  declarations: [AXDataGridComponent, AXGridTextColumn,AXGridCheckColumn,BooleanRenderer],
  imports: [CommonModule, FormsModule, AgGridModule, AXDataSourceModule],
  exports: [AXDataGridComponent, AXGridTextColumn,AXGridCheckColumn,BooleanRenderer],
  entryComponents: [BooleanRenderer],
  providers: []
})
export class AXDataGridModule { }
