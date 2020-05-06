import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DemoPage } from "./demo-page.component";
import { ACoreXSPAModule } from "acorex-spa";
import { ACoreXUIModule } from "acorex-ui";
import { AliPage } from "./ali/ali.page";
import { TestPage } from "./test-page/test-page";
import { ColorPickerPage } from "./colorpicker/colorpicker.component";
import { FormControllPage } from "./formcontroll/formcontroll.page";
import { FormsModule } from "@angular/forms";
import { PickerPage } from "./picker/picker.page";
import { ToolbarPage } from "./toolbar/toolbar.page";
import { PopoverDemoPage } from "./popover/popover-demo.page";
import { Routes, RouterModule } from "@angular/router";
import { TextBoxPage } from "./formcontroll/text-box.page";
import { SelectBoxPage } from "./formcontroll/select-box.page";
import { EditorsPage } from "./editors/editors.page";
import { UploaderPage } from "./uploader/uploader-page.component";

const pages = [
  DemoPage,
  PopoverDemoPage,
  TextBoxPage,
  SelectBoxPage,
  AliPage,
  TestPage,
  ColorPickerPage,
  FormControllPage,
  PickerPage,
  ToolbarPage,
  EditorsPage,
  UploaderPage
];

const ROUTES: Routes = [
  {
    path: "components/form/search-box",
    component: SelectBoxPage
  },
  {
    path: "DemoPage",
    component: DemoPage
  },
  {
    path: "AliPage",
    component: AliPage
  },
  {
    path: "Editors",
    component: EditorsPage
  },
  {
    path: "Uploader",
    component: UploaderPage
  }
];

@NgModule({
  declarations: [...pages],
  imports: [
    CommonModule,
    ACoreXUIModule,
    ACoreXSPAModule,
    RouterModule.forRoot(ROUTES),
    FormsModule
  ],
  exports: [],
  providers: [],
  entryComponents: [...pages]
})
export class DemoModule {}
