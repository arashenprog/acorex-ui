import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsListPage } from './dashboard/dashboard.page';
import { DesignerPage } from './designer/designer.page';
import { ACoreXUIModule } from 'acorex-ui';
import { AcorexSpaModule } from 'acorex-spa';
import { FormsService } from './froms.services';
import { PreviewFormPage } from './designer/preview.page';

@NgModule({
  declarations: [FormsListPage, DesignerPage,PreviewFormPage],
  imports: [
    CommonModule, 
    ACoreXUIModule,
    AcorexSpaModule
  ],
  exports: [],
  entryComponents: [FormsListPage, DesignerPage,PreviewFormPage],
  providers: [FormsService],
})
export class FormBuilderModule { }
