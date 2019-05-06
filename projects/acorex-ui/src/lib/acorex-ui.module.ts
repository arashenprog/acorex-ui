import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AXButtonModule } from "./components/button/button.module";
import { AXBadgeModule } from "./components/badge/badge.module";
import { AXCardModule } from "./components/cards/card.module";
import { AXCarouselModule } from "./components/carousel/carousel.module";
import { AXCheckBoxModule } from "./components/checkbox/checkbox.module";
import { AXContainerModule } from "./components/container/container.module";
import { AXDataGridModule } from "./components/data-grid/datagrid.module";
import { AXDataPickerModule } from "./components/date-picker/data-picker.module";
import { AXGridLayoutModule } from "./components/grid-layout/grid.layout.module";
import { AXImageViewModule } from "./components/imageView/image-view.module";
import { AXLoadingModule } from "./components/loading/loading.module";
import { AXMenuModule } from "./components/menu/menu.module";
import { AXPanelBoxModule } from "./components/panel-box/panel-box.module";
import { AXPasswordBoxModule } from "./components/password-box/password-box.module";
import { AXPopupModule } from "./components/popup/popup.module";
import { AXProgressBarModule } from "./components/progress-bar/progress-bar.module";
import { AXRadioButtonModule } from "./components/radio-button/radio-button.module";
import { AXSelectBoxModule } from "./components/select-box/select-box.module";
import { AXSelectionListModule } from "./components/selection-list/selection-list.module";
import { AXTabViewModule } from "./components/tab-view/tab-view.module";
import { AXTextBoxModule } from "./components/text-box/text-box.module";
import { AXUploadFileModule } from "./components/upload-file/upload-file.module";
import { AXValidationModule } from "./components/validation/validation.module";
import { AXCoreModule } from './core/core.module';
import { AXToastModule } from './components/toast/toast.module';
import { AXHttpModule } from './core/http/http.module';
import { AXErrorService } from './core/error/error.service';
import { AXDefaultErrorService } from './config/default-error.service';
import { AXTabPageModule } from './components/tab-page/api';

@NgModule({
  declarations: [],
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
    AXTabViewModule,
    AXTextBoxModule,
    AXUploadFileModule,
    AXValidationModule,
    AXTabPageModule,
    //
    AXHttpModule
  ],
  exports: [
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
    AXTabViewModule,
    AXTextBoxModule,
    AXUploadFileModule,
    AXValidationModule,
    AXTabPageModule,
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
