import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AXMobileLayoutComponent } from "./mobile.layout";
import { ACoreXUIModule } from "acorex-ui";
import { AXLayoutSharedModule } from '../shared/api';
import { AXPageModule } from "../shared/page/page.module";

@NgModule({
  declarations: [AXMobileLayoutComponent],
  imports: [CommonModule, ACoreXUIModule, AXLayoutSharedModule, AXPageModule],
  exports: [AXMobileLayoutComponent],
  providers: []
})
export class AXMobileModule {}
