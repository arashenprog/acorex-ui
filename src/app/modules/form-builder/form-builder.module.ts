import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardPage } from './dashboard/dashboard.page';
import { ACoreXUIModule } from 'acorex-ui';
import { AcorexSpaModule } from 'acorex-spa';

@NgModule({
  declarations: [DashboardPage],
  imports: [
    CommonModule,
    ACoreXUIModule,
    AcorexSpaModule
  ],
  exports: [DashboardPage],
  providers: [],
  entryComponents: [DashboardPage]
})
export class FormBuilderModule { }
