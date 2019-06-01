import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXResponsiveMenuComponent } from './responsive-menu.component';
import { ACoreXUIModule } from 'acorex-ui';


// TODO : Import AXSideMenu
@NgModule({
  declarations: [AXResponsiveMenuComponent],
  imports: [CommonModule, ACoreXUIModule],
  exports: [AXResponsiveMenuComponent],
  providers: [],
})
export class AXResponsiveMenuModule { }
