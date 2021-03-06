import { NgModule } from '@angular/core';
import { AXListComponent } from './list.component';
import { AXDataSourceModule } from '../../data-source/api';
import { CommonModule } from '@angular/common';
import { AXToolbarListViewComponent } from './toolbar-list-view.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
    declarations: [AXListComponent, AXToolbarListViewComponent],
    imports: [CommonModule, AXDataSourceModule, DragDropModule],
    exports: [AXListComponent, AXToolbarListViewComponent],
    providers: [],
})
export class AXListModule { }