import { NgModule } from "@angular/core";
import { AXTabularLayoutComponent } from "./tabular.layout";
import { ACoreXUIModule } from 'acorex-ui';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  AXPageFooterComponent, AXPageContentComponent, AXPageComponent,AXLayoutSharedModule
} from '../shared/api';
import { AXPageModule } from "../shared/page/page.module";
import { AXSideMenuModule } from "../shared/sidemenu/sidemenu.module";



@NgModule({
  declarations: [
    AXTabularLayoutComponent
  ],
  imports: [
    RouterModule,
    FormsModule,
    ACoreXUIModule,
    AXPageModule,
    AXLayoutSharedModule,
    AXSideMenuModule
  ],
  exports: [
    AXTabularLayoutComponent
  ],
  providers: []
})
export class AXTabularModule { }
