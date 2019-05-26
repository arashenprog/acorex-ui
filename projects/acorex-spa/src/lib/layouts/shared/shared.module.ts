import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXLayoutTabsComponent } from "./tabs/tabs.component";


@NgModule({
    declarations: [AXLayoutTabsComponent],
    imports: [ CommonModule ],
    exports: [AXLayoutTabsComponent],
    providers: [],
})
export class AXLayoutSharedModule {}