import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXLayoutTabsComponent } from './tabs.component';
import { ACoreXUIModule } from "acorex-ui";

@NgModule({
    declarations: [AXLayoutTabsComponent],
    imports: [ CommonModule,ACoreXUIModule ],
    exports: [AXLayoutTabsComponent],
    providers: [],
})
export class AXLayoutTabsModule {}