import { NgModule } from "@angular/core";
import { AXTabularLayoutComponent } from "./tabular.layout";
import { AcoreXUIModule } from 'acorex-ui';
import { RouterModule } from '@angular/router';
import { AXHeaderComponent } from './header/header.layout';
import { AXSideMenuComponent } from './sidemenu/sidemenu.layout';
import { FormsModule } from '@angular/forms';
import {
  AXPageFooterComponent, AXPageToolbarComponent, AXPageContentComponent, AXPageComponent
} from '../shared/api';
@NgModule({
  declarations: [
    AXTabularLayoutComponent,
    AXHeaderComponent,
    AXPageToolbarComponent,
    AXPageFooterComponent,
    AXPageContentComponent,
    AXPageComponent,
    AXSideMenuComponent
  ],
  imports: [
    RouterModule,
    FormsModule,
    AcoreXUIModule,
  ],
  exports: [
    AXTabularLayoutComponent,
    AXHeaderComponent,
    AXPageToolbarComponent,
    AXPageFooterComponent,
    AXPageContentComponent,
    AXPageComponent,
    AXSideMenuComponent
  ],
  providers: []
})
export class AXTabularModule { }
