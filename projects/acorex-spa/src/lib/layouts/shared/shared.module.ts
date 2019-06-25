import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AXLayoutTabsComponent } from "./tabs/tabs.component";
import { AXPageModule } from "./page/page.module";
import { AXSideMenuModule } from "./sidemenu/sidemenu.module";
import { AXCoreModule } from "acorex-ui";

@NgModule({
  declarations: [AXLayoutTabsComponent],
  imports: [CommonModule, AXCoreModule, AXPageModule, AXSideMenuModule],
  exports: [AXLayoutTabsComponent, AXSideMenuModule],
  providers: []
})
export class AXLayoutSharedModule {}
