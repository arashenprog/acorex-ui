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
import { FilterPanelDemoPage } from './data/filter-panel.page';
import { PickerPage } from './picker/picker.page';
import { ToolbarPage } from './toolbar/toolbar.page';

const pages = [
  DemoPage,
  DashboardPage,
  AliPage,
  TestPage,
  WidgetsPage,
  ColorPickerPage,
  FormControllPage,
  FilterPanelDemoPage,
  PickerPage,
  ToolbarPage
]

@NgModule({
  declarations: [...pages],
  imports: [CommonModule, ACoreXUIModule, AcorexSpaModule, FormsModule],
  exports: [],
  providers: [],
  entryComponents: [...pages]
})
export class DemoModule { }
