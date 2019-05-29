import { NgModule } from "@angular/core";
import { AXTabularLayoutComponent } from "./tabular.layout";
import { ACoreXUIModule } from 'acorex-ui';
import { RouterModule } from '@angular/router';
import { AXSideMenuComponent } from './sidemenu/sidemenu.layout';
import { FormsModule } from '@angular/forms';
import {
  AXPageFooterComponent, AXPageContentComponent, AXPageComponent,AXLayoutSharedModule
} from '../shared/api';
import { AXPageModule } from "../shared/page/page.module";



@NgModule({
  declarations: [
    AXTabularLayoutComponent,
    AXSideMenuComponent
  ],
  imports: [
    RouterModule,
    FormsModule,
    ACoreXUIModule,
    AXPageModule,
    AXLayoutSharedModule
  ],
  exports: [
    AXTabularLayoutComponent,
    AXSideMenuComponent
  ],
  providers: []
})
export class AXTabularModule { }
