import { NgModule } from "@angular/core";
import { AXTabularLayoutComponent } from "./tabular.layout";
import { ACoreXUIModule } from 'acorex-ui';
import { RouterModule } from '@angular/router';
import { AXHeaderComponent } from './header/header.layout';
import { AXSideMenuComponent } from './sidemenu/sidemenu.layout';
import { FormsModule } from '@angular/forms';
import {
  AXPageFooterComponent, AXPageContentComponent, AXPageComponent
} from '../shared/api';
@NgModule({
  declarations: [
    AXTabularLayoutComponent,
    AXHeaderComponent,
    AXPageFooterComponent,
    AXPageContentComponent,
    AXPageComponent,
    AXSideMenuComponent
  ],
  imports: [
    RouterModule,
    FormsModule,
    ACoreXUIModule,
  ],
  exports: [
    AXTabularLayoutComponent,
    AXHeaderComponent,
    AXPageFooterComponent,
    AXPageContentComponent,
    AXPageComponent,
    AXSideMenuComponent
  ],
  providers: []
})
export class AXTabularModule { }
