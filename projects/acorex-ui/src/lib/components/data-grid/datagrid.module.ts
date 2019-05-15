import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AXDataGridComponent } from "./datagrid.component";
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { AXDataSourceModule } from '../datasource/datasource.module';
@NgModule({
  declarations: [AXDataGridComponent],
  imports: [CommonModule, FormsModule, AgGridModule,AXDataSourceModule],
  exports: [AXDataGridComponent],
  providers: []
})
export class AXDataGridModule { }
