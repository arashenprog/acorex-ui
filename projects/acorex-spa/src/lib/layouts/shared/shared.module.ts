import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXLayoutTabsComponent } from "./tabs/tabs.component";
import { AXPageModule } from './page/page.module';


@NgModule({
  declarations: [AXLayoutTabsComponent],
  imports: [CommonModule, AXPageModule],
  exports: [AXLayoutTabsComponent],
  providers: [],
})
export class AXLayoutSharedModule { }
