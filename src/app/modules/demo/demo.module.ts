import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DemoPage } from "./demo-page.component";
import { DashboardPage } from "./dashboard/dashboard.page";
import { AcorexSpaModule } from "acorex-spa";
import { ACoreXUIModule } from "acorex-ui";
import { AliPage } from "./ali/ali.page";
import { TestPage } from "./test-page/test-page";
import { WidgetsPage } from './widgets/widgets.page';

@NgModule({
  declarations: [DemoPage, DashboardPage, AliPage, TestPage,WidgetsPage],
  imports: [CommonModule, ACoreXUIModule, AcorexSpaModule],
  exports: [],
  providers: [],
  entryComponents: [DemoPage, DashboardPage, AliPage, TestPage,WidgetsPage]
})
export class DemoModule {}
