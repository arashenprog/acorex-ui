import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AXSideMenuComponent } from "./sidemenu.component";
import { ACoreXUIModule } from "acorex-ui";

@NgModule({
  declarations: [AXSideMenuComponent],
  imports: [CommonModule,ACoreXUIModule],
  exports: [AXSideMenuComponent],
  providers: []
})
export class AXSideMenuModule {}
