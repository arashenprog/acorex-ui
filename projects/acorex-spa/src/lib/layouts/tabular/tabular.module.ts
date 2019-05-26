import { NgModule } from "@angular/core";
import { AXTabularLayoutComponent } from "./tabular.layout";
import { ACoreXUIModule } from 'acorex-ui';
import { RouterModule } from '@angular/router';
import { AXSideMenuComponent } from './sidemenu/sidemenu.layout';
import { FormsModule } from '@angular/forms';
import {
  AXPageFooterComponent, AXPageContentComponent, AXPageComponent,AXLayoutSharedModule
} from '../shared/api';



@NgModule({
  declarations: [
    AXTabularLayoutComponent,
    AXPageFooterComponent,
    AXPageContentComponent,
    AXPageComponent,
    AXSideMenuComponent
  ],
  imports: [
    RouterModule,
    FormsModule,
    ACoreXUIModule,
    AXLayoutSharedModule
  ],
  exports: [
    AXTabularLayoutComponent,
    AXPageFooterComponent,
    AXPageContentComponent,
    AXPageComponent,
    AXSideMenuComponent
  ],
  providers: []
})
export class AXTabularModule { }
