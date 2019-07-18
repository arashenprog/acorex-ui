import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DemoPage } from "./demo-page.component";
import { DashboardPage } from "./dashboard/dashboard.page";
import { AcorexSpaModule } from "acorex-spa";
import { ACoreXUIModule } from "acorex-ui";
import { AliPage } from "./ali/ali.page";
import { TestPage } from "./test-page/test-page";
import { WidgetsPage } from './widgets/widgets.page';
import { ColorPickerPage } from './colorpicker/colorpicker.component';
import { FormControllPage } from './formcontroll/formcontroll.page';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [DemoPage, DashboardPage, AliPage, TestPage, WidgetsPage, ColorPickerPage,FormControllPage],
  imports: [CommonModule, ACoreXUIModule, AcorexSpaModule,FormsModule],
  exports: [],
  providers: [],
  entryComponents: [DemoPage, DashboardPage, AliPage, TestPage, WidgetsPage, ColorPickerPage,FormControllPage]
})
export class DemoModule { }
