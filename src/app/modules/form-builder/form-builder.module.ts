import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardPage } from './dashboard/dashboard.page';
<<<<<<< HEAD
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
=======
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
>>>>>>> 796859c54ab6160894ebfa18b3417af2ecb5075f
})
export class FormBuilderModule { }
