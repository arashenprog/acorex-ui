import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AXLayoutTabsComponent } from "./tabs/tabs.component";
import { AXPageModule } from "./page/page.module";
import { AXSideMenuModule } from "./sidemenu/sidemenu.module";
import { AXScrollModule } from "acorex-ui";

@NgModule({
  declarations: [AXLayoutTabsComponent],
  imports: [CommonModule, AXPageModule, AXSideMenuModule, AXScrollModule],
  exports: [AXLayoutTabsComponent, AXSideMenuModule],
  providers: []
})
export class AXLayoutSharedModule {}
