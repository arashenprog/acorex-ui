import { NgModule } from "@angular/core";
import { AXTabularLayoutComponent } from "./tabular.layout";
import { ACoreXUIModule } from 'acorex-ui';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AXSideMenuModule } from "../shared/components/sidemenu/sidemenu.module";
import { AXLayoutTabsModule } from "../shared/components/tabs/tabs.module";



@NgModule({
  declarations: [
    AXTabularLayoutComponent
  ],
  imports: [
    RouterModule,
    FormsModule,
    ACoreXUIModule,
    AXSideMenuModule,
    AXLayoutTabsModule
  ],
  exports: [
    AXTabularLayoutComponent
  ],
  providers: []
})
export class AXTabularModule { }
