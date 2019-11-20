import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXLOVComponent } from './data-lov.component';
import { FormsModule } from '@angular/forms';
import { AXDataLovPopupComponent } from './data-lov-popup/data-lov-popup.component';
import { AXDataGridModule } from '../data-grid/datagrid.module';
import { AXDataSourceModule } from '../data-source/datasource.module';
import { AXButtonModule } from '../../form/button/button.module';

@NgModule({
    declarations: [AXLOVComponent,AXDataLovPopupComponent],
    imports: [ CommonModule,FormsModule ,AXDataGridModule,AXDataSourceModule,AXButtonModule],
    exports: [AXLOVComponent,AXDataLovPopupComponent],
    providers: [],
    entryComponents:[AXDataLovPopupComponent]
})
export class AXLOVModule {}