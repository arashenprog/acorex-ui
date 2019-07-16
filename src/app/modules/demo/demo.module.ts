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

@NgModule({
  declarations: [DemoPage, DashboardPage, AliPage, TestPage, WidgetsPage, ColorPickerPage],
  imports: [CommonModule, ACoreXUIModule, AcorexSpaModule],
  exports: [],
  providers: [],
  entryComponents: [DemoPage, DashboardPage, AliPage, TestPage, WidgetsPage, ColorPickerPage]
})
export class DemoModule { }
