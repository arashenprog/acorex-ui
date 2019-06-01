import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AXSideMenuComponent } from "./sidemenu.layout";
import { AXLayoutSharedModule } from "../shared.module";

@NgModule({
  declarations: [AXSideMenuComponent],
  imports: [CommonModule],
  exports: [AXSideMenuComponent],
  providers: []
})
export class AXSideMenuModule {}
