import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXTreeListComponent } from './tree-list.component';
import { AXCheckBoxModule } from '../../form/checkbox/checkbox.module';

@NgModule({
    declarations: [AXTreeListComponent],
    imports: [ CommonModule,AXCheckBoxModule ],
    exports: [AXTreeListComponent],
    providers: [],
})
export class AXTreeListModule {}