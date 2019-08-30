import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXLayoutTabsComponent } from './tabs.component';
import { ACoreXUIModule } from "acorex-ui";
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
    declarations: [AXLayoutTabsComponent],
    imports: [ CommonModule,ACoreXUIModule,DragDropModule ],
    exports: [AXLayoutTabsComponent],
    providers: [],
})
export class AXLayoutTabsModule {}