import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXLayoutTabsComponent } from './tabs.component';
import { ACoreXUIModule,AXMenuModule } from "acorex-ui";
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
    declarations: [AXLayoutTabsComponent],
    imports: [ CommonModule,ACoreXUIModule,DragDropModule,AXMenuModule ],
    exports: [AXLayoutTabsComponent],
    providers: [],
})
export class AXLayoutTabsModule {}