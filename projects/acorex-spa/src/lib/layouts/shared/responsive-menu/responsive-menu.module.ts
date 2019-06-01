import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXResponsiveMenuComponent } from './responsive-menu.component';
import { ACoreXUIModule } from 'acorex-ui';
import { AXLayoutSharedModule } from '../shared.module';


// TODO : Import AXSideMenu
@NgModule({
  declarations: [AXResponsiveMenuComponent],
  imports: [CommonModule, ACoreXUIModule,AXLayoutSharedModule],
  exports: [AXResponsiveMenuComponent],
  providers: [],
})
export class AXResponsiveMenuModule { }
