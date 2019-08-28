import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXResponsiveMenuComponent } from './responsive-menu.component';
import { ACoreXUIModule } from 'acorex-ui';
import { AXSideMenuModule } from '../sidemenu/sidemenu.module'


// TODO : Import AXSideMenu
@NgModule({
  declarations: [AXResponsiveMenuComponent],
  imports: [CommonModule, ACoreXUIModule, AXSideMenuModule],
  exports: [AXResponsiveMenuComponent],
  providers: [],
})
export class AXResponsiveMenuModule { }
