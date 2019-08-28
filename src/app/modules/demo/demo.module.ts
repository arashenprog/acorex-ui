import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DemoPage } from "./demo-page.component";
import { DashboardPage } from "./dashboard/dashboard.page";
import { ACoreXSPAModule } from "acorex-spa";
import { ACoreXUIModule, AXRouterModule, AXRoutes } from "acorex-ui";
import { AliPage } from "./ali/ali.page";
import { TestPage } from "./test-page/test-page";
import { WidgetsPage } from './widgets/widgets.page';
import { ColorPickerPage } from './colorpicker/colorpicker.component';
import { FormControllPage } from './formcontroll/formcontroll.page';
import { FormsModule } from '@angular/forms';
import { FilterPanelDemoPage } from './data/filter-panel.page';
import { PickerPage } from './picker/picker.page';
import { ToolbarPage } from './toolbar/toolbar.page';
import { PopoverDemoPage } from './popover/popover-demo.page';

const pages = [
  DemoPage,
  DashboardPage,
  PopoverDemoPage,
  AliPage,
  TestPage,
  WidgetsPage,
  ColorPickerPage,
  FormControllPage,
  FilterPanelDemoPage,
  PickerPage,
  ToolbarPage
]

const ROUTES: AXRoutes = [
  {
    path: "/components/Data/filter",
    component: FilterPanelDemoPage
  },
  {
    path: "/AliPage",
    component: AliPage
  }
];

@NgModule({
  declarations: [...pages],
  imports: [
    CommonModule,
    ACoreXUIModule,
    ACoreXSPAModule,
    AXRouterModule.forRoot(ROUTES),
    FormsModule],
  exports: [],
  providers: [],
  entryComponents: [...pages]
})
export class DemoModule { }
