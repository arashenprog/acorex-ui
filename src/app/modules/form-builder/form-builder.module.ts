import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardPage } from './dashboard/dashboard.page';

@NgModule({
  declarations: [DashboardPage],
  imports: [ CommonModule ],
  exports: [DashboardPage],
  providers: [],
})
export class FormBuilderModule {}
