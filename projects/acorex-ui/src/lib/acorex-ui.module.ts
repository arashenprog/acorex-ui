import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AXButtonModule } from "./components/form/button/button.module";
import { AXBadgeModule } from "./components/layout/badge/badge.module";
import { AXCardModule } from "./components/layout/cards/card.module";
import { AXCarouselModule } from "./components/layout/carousel/carousel.module";
import { AXCheckBoxModule } from "./components/form/checkbox/checkbox.module";
import { AXContainerModule } from "./components/layout/container/container.module";
import { AXDataGridModule } from "./components/data/data-grid/datagrid.module";
import { AXDatePickerModule } from "./components/form/date-picker/date-picker.module";
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
import { AXCoreModule } from "./core/core.module";
import { AXToastModule } from "./components/layout/toast/toast.module";
import { AXHttpModule } from "./core/http/http.module";
import { AXTabPageModule } from "./components/nav/api";
import { AXThemeWrapperComponent } from "./components/layout/theme-wrapper/theme-wrapper.component";
import { AXDefaultHttpInterceptor } from "./config/default-http.interceptors";
import { AX_ERROR_DISPLAY_INTERCEPTOR } from "./core/error/error.service";
import { AXDefaultErrorDisplayInterceptor } from "./config/default-error.interceptor";
import { AXDrawerModule } from "./components/layout/drawer/drawer.module";
import { AX_HTTP_EVENT_INTERCEPTOR } from "./core/http/http-events.interceptor";
import { AXDataSourceModule } from "./components/data/data-source/datasource.module";
import { AXListModule } from "./components/data/data-list/list/list.module";
import { AXWidgetModule } from "./components/layout/widget/widget.module";
import { AXToolbarModule } from "./components/layout/toolbar/api";
import { AXDockLayoutModule } from "./components/layout/dock-layout/dock-layout.module";
import { AXTreeListModule } from "./components/data/tree-list/tree-list.module";

import * as $ from "jquery";
// It is required to have JQuery as global in the window object.
window["$"] = $;

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
    AXDatePickerModule,
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
    AXListModule,
    AXWidgetModule,
    AXToolbarModule,
    AXDockLayoutModule,
    AXHttpModule,
    AXDataSourceModule,
    AXTreeListModule
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
    AXDatePickerModule,
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
    AXListModule,
    AXWidgetModule,
    AXToolbarModule,
    AXDockLayoutModule,
    AXHttpModule,
    AXDataSourceModule,
    AXTreeListModule
  ],
  providers: [
    {
      provide: AX_ERROR_DISPLAY_INTERCEPTOR,
      useClass: AXDefaultErrorDisplayInterceptor
    },
    {
      provide: AX_HTTP_EVENT_INTERCEPTOR,
      useClass: AXDefaultHttpInterceptor
    }
  ]
})
export class ACoreXUIModule {}
