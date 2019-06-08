import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardPage } from './dashboard/dashboard.page';
import { DesignerPage } from './designer/designer.page';
import { ACoreXUIModule } from 'acorex-ui';
import { AcorexSpaModule } from 'acorex-spa';
import { FormsService } from './froms.services';

@NgModule({
  declarations: [DashboardPage, DesignerPage],
  imports: [
    CommonModule, 
    ACoreXUIModule,
    AcorexSpaModule
  ],
  exports: [DashboardPage, DesignerPage],
  entryComponents: [DashboardPage, DesignerPage],
  providers: [FormsService],
})
export class FormBuilderModule { }
