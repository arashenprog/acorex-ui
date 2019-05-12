import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AXButtonModule } from "./components/form/button/button.module";
import { AXBadgeModule } from "./components/layout/badge/badge.module";
import { AXCardModule } from "./components/layout/cards/card.module";
import { AXCarouselModule } from "./components/layout/carousel/carousel.module";
import { AXCheckBoxModule } from "./components/form/checkbox/checkbox.module";
import { AXContainerModule } from "./components/layout/container/container.module";
import { AXDataGridModule } from "./components/data-grid/datagrid.module";
import { AXDataPickerModule } from "./components/form/date-picker/data-picker.module";
import { AXGridLayoutModule } from "./components/layout/grid-layout/grid.layout.module";
import { AXImageViewModule } from "./components/layout/image-view/image-view.module";
import { AXLoadingModule } from "./components/layout/loading/loading.module";
import { AXMenuModule } from "./components/layout/menu/menu.module";
import { AXPanelBoxModule } from "./components/layout/panel-box/panel-box.module";
import { AXPasswordBoxModule } from "./components/form/password-box/password-box.module";
import { AXPopupModule } from "./components/nav/popup/popup.module";
import { AXProgressBarModule } from "./components/layout/progress-bar/progress-bar.module";
import { AXRadioButtonModule } from "./components/form/radio-button/radio-button.module";
import { AXSelectBoxModule } from "./components/form/select-box/select-box.module";
import { AXSelectionListModule } from "./components/form/selection-list/selection-list.module";
import { AXTextBoxModule } from "./components/form/text-box/text-box.module";
import { AXUploadFileModule } from "./components/form/upload-file/upload-file.module";
import { AXValidationModule } from "./components/form/validation/validation.module";
import { AXCoreModule } from './core/core.module';
import { AXToastModule } from './components/layout/toast/toast.module';
import { AXHttpModule } from './core/http/http.module';
import { AXErrorService } from './core/error/error.service';
import { AXDefaultErrorService } from './config/default-error.service';
import { AXTabPageModule } from './components/nav/api';
import { AXThemeWrapperComponent } from './components/layout/theme-wrapper/theme-wrapper.component';
import { AXDrawerModule } from './components/layout/drawer/drawer.module';

@NgModule({
  declarations: [AXThemeWrapperComponent],
  imports: [
    CommonModule,
    AXCoreModule,
    AXToastModule,
    AXButtonModule,
    AXBadgeModule,
    AXCardModule,
    AXCarouselModule,
    AXCheckBoxModule,
    AXContainerModule,
    AXDataGridModule,
    AXDataPickerModule,
    AXGridLayoutModule,
    AXImageViewModule,
    AXLoadingModule,
    AXMenuModule,
    AXPanelBoxModule,
    AXPasswordBoxModule,
    AXPopupModule,
    AXProgressBarModule,
    AXRadioButtonModule,
    AXSelectBoxModule,
    AXSelectionListModule,
    AXTextBoxModule,
    AXUploadFileModule,
    AXValidationModule,
    AXTabPageModule,
    AXDrawerModule,
    //
    AXHttpModule
  ],
  exports: [
    AXThemeWrapperComponent,
    AXCoreModule,
    AXToastModule,
    AXButtonModule,
    AXBadgeModule,
    AXCardModule,
    AXCarouselModule,
    AXCheckBoxModule,
    AXContainerModule,
    AXDataGridModule,
    AXDataPickerModule,
    AXGridLayoutModule,
    AXImageViewModule,
    AXLoadingModule,
    AXMenuModule,
    AXPanelBoxModule,
    AXPasswordBoxModule,
    AXPopupModule,
    AXProgressBarModule,
    AXRadioButtonModule,
    AXSelectBoxModule,
    AXSelectionListModule,
    AXTextBoxModule,
    AXUploadFileModule,
    AXValidationModule,
    AXTabPageModule,
    AXDrawerModule,
    //
    AXHttpModule
  ],
  providers: [
    {
      provide: AXErrorService,
      useClass: AXDefaultErrorService
    }
  ]
})
export class AcoreXUIModule { 

}
