import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AXMobileLayoutComponent } from "./mobile.layout";
import { ACoreXUIModule } from "acorex-ui";
import { AXPageModule } from "../shared/page/page.module";
import { AXResponsiveMenuModule } from "../shared/components/responsive-menu/responsive-menu.module";

@NgModule({
  declarations: [AXMobileLayoutComponent],
  imports: [CommonModule, ACoreXUIModule, AXPageModule,AXResponsiveMenuModule],
  exports: [AXMobileLayoutComponent],
  providers: []
})
export class AXMobileModule {}
