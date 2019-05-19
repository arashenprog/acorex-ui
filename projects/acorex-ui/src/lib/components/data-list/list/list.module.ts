import { NgModule } from '@angular/core';
import { AXListComponent } from './list.component';
import { AXDataSourceModule } from '../../datasource/api';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [AXListComponent],
    imports: [CommonModule,AXDataSourceModule],
    exports: [AXListComponent],
    providers: [],
})
export class AXListModule { }