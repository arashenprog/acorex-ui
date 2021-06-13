
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AXButtonModule } from "./components/form/button/button.module";
import { AXBadgeModule } from "./components/layout/badge/badge.module";
import { AXCardModule } from "./components/layout/cards/card.module";
import { AXCarouselModule } from "./components/layout/carousel/carousel.module";
import { AXCheckBoxModule } from "./components/form/checkbox/checkbox.module";
import { AXDatePickerModule } from "./components/form/date-picker/date-picker.module";

import { AXImageViewModule } from "./components/layout/image-view/api";
import { AXLoadingModule } from "./components/layout/loading/api";
import { AXMenuModule } from "./components/layout/menu/api";
import { AXPanelBoxModule } from "./components/layout/panel-box/api";
import { AXAccordionModule } from "./components/layout/accordion/api";
import { AXPasswordBoxModule } from "./components/form/password-box/api";
import { AXPopupModule } from "./components/nav/popup/popup.module";
import { AXProgressBarModule } from "./components/layout/progress-bar/progress-bar.module";
import { AXSelectBoxModule } from "./components/form/select-box/select-box.module";
import { AXSelectionListModule } from "./components/form/selection-list/selection-list.module";
import { AXTextBoxModule } from "./components/form/text-box/text-box.module";
import { AXTextAreaModule } from "./components/form/text-area/text-area.module";
import { AXUploadFileModule } from "./components/form/upload-file/upload-file.module";
import { AXValidationModule } from "./components/form/validation/validation.module";
import { AXCoreModule } from "./core/core.module";
import { AXToastModule } from "./components/layout/toast/toast.module";
import { AXHttpModule } from "./core/http/http.module";
import { AXTabViewModule } from "./components/layout/tab-view/api";
import { AXTabPageModule, AXPageModule } from "./components/nav/api";
import { AXThemeWrapperComponent } from "./components/layout/theme-wrapper/theme-wrapper.component";
import { AXDefaultHttpInterceptor } from "./config/default-http.interceptors";
import { AX_ERROR_DISPLAY_INTERCEPTOR } from "./core/error/error.service";
import { AXDefaultErrorDisplayInterceptor } from "./config/default-error.interceptor";
import { AXDrawerModule } from "./components/layout/drawer/drawer.module";
import { AX_HTTP_EVENT_INTERCEPTOR } from "./core/http/http-events.interceptor";
import { AXDataSourceModule } from "./components/data/data-source/datasource.module";
import { AXListModule } from "./components/data/data-list/list/list.module";
import { AXToolbarModule } from "./components/layout/toolbar/api";
import { AXTreeListModule } from "./components/data/tree-list/tree-list.module";
import { AXSchedulerModule } from "./components/calendar/scheduler/scheduler.module";
import { AXCalendarBoxModule } from "./components/calendar/calendar-box/api";
import { AXPopoverModule } from "./components/layout/popover/api";
import { AXDropDownModule } from "./components/form/drop-down/drop-down.module";
import { AXColorPickerModule } from "./components/form/color-picker/color-picker.module";
import { AXFilterModule } from "./components/data/filter/filter.module";
import { AXEditBoxModule } from "./components/form/edit-box/edit-box.module";
import { AXSearchBoxModule } from "./components/form/search-box/search-box.module";
import { AXTooltipModule } from "./components/layout/tooltip/tooltip.module";
import { AXHtmlModule } from "./core/utils/html/html.module";
import { AXSeparatorModule } from "./core/utils/separator/separator.module";
import { AXTimePickerModule } from "./components/form/time-picker/time-picker.module";
import { AXTimeBoxModule } from "./components/time/time-box/time-box.module";
import { AXNumberBoxModule } from "./components/form/number-box/number-box.module";



let modules = [

  AXCoreModule,
  AXPageModule,
  AXToastModule,
  AXButtonModule,
  AXBadgeModule,
  AXCardModule,
  AXCarouselModule,
  AXCheckBoxModule,
  AXDatePickerModule,
  AXTimePickerModule,
  AXTimeBoxModule,
  AXImageViewModule,
  AXLoadingModule,
  AXMenuModule,
  AXPanelBoxModule,
  AXAccordionModule,
  AXPasswordBoxModule,
  AXPopupModule,
  AXProgressBarModule,
  AXSelectBoxModule,
  AXSelectionListModule,
  AXTextBoxModule,
  AXTextAreaModule,
  AXSearchBoxModule,
  AXUploadFileModule,
  AXValidationModule,
  AXTabViewModule,
  AXTabPageModule,
  AXDrawerModule,
  AXListModule,
  AXToolbarModule,
  AXHttpModule,
  AXDataSourceModule,
  AXTreeListModule,
  AXSchedulerModule,
  AXCalendarBoxModule,
  AXPopoverModule,
  AXDropDownModule,
  AXColorPickerModule,
  AXFilterModule,
  AXEditBoxModule,
  AXTooltipModule,
  AXHtmlModule,
  AXSeparatorModule,
  AXNumberBoxModule
];
@NgModule({
  declarations: [AXThemeWrapperComponent],
  imports: [CommonModule, ...modules],
  exports: [AXThemeWrapperComponent, ...modules],
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
export class ACoreXUIModule { }
