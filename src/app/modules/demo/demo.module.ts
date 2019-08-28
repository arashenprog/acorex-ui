import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DemoPage } from "./demo-page.component";
import { DashboardPage } from "./dashboard/dashboard.page";
import { ACoreXSPAModule } from "acorex-spa";
import { ACoreXUIModule } from "acorex-ui";
import { AliPage } from "./ali/ali.page";
import { TestPage } from "./test-page/test-page";
import { WidgetsPage } from './widgets/widgets.page';
import { ColorPickerPage } from './colorpicker/colorpicker.component';
import { FormControllPage } from './formcontroll/formcontroll.page';
import { FormsModule } from '@angular/forms';
import { PickerPage } from './picker/picker.page';
import { ToolbarPage } from './toolbar/toolbar.page';
import { PopoverDemoPage } from './popover/popover-demo.page';
import { DemoDataModule } from './data/demo-data.module';
import { Routes, RouterModule } from '@angular/router';

const pages = [
  DemoPage,
  DashboardPage,
  PopoverDemoPage,
  AliPage,
  TestPage,
  WidgetsPage,
  ColorPickerPage,
  FormControllPage,
  PickerPage,
  ToolbarPage
]

const ROUTES: Routes = [
  {
    path:"data",
    loadChildren : "./data/demo-data.module#DemoDataModule" 
  },
  {
    path: "AliPage",
    component: AliPage
  }
];

@NgModule({
  declarations: [...pages],
  imports: [
    CommonModule,
    ACoreXUIModule,
    ACoreXSPAModule,
    DemoDataModule,
    RouterModule.forRoot(ROUTES),
    FormsModule
  ],
  exports: [],
  providers: [],
  entryComponents: [...pages]
})
export class DemoModule {
  
}
