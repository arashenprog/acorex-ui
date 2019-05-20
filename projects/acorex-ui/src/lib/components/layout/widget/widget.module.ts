import {
  NgModule, ModuleWithProviders
} from "@angular/core";
import { AXWidgetService } from './widget.service';
import { AXWidgetManagerComponent } from './widget-manager.component';
import { AXWidgetComponent, AXWidgetContainerComponent } from './widget.component';
import { CommonModule } from '@angular/common';
import { GridsterModule } from 'angular-gridster2';
import { AXWidgetPickerPage } from './widget-picker.page';
import { AXCoreModule } from '../../../core/core.module';
import { AXLoadingModule } from '../loading/loading.module';
import { AXDateWidgetComponent } from './built-in/date/date.widget';
import { AXNoteWidgetComponent } from './built-in/note/note.widget';
import { AXPopupModule } from '../../nav/popup/popup.module';



@NgModule({
  declarations: [
    AXWidgetManagerComponent,
    AXWidgetContainerComponent,
    AXWidgetPickerPage,
    AXDateWidgetComponent,
    AXNoteWidgetComponent,
  ],
  imports: [
    CommonModule,
    AXCoreModule,
    AXPopupModule,
    AXLoadingModule,
    GridsterModule
  ],
  providers: [
    AXWidgetService
  ],
  exports: [
    AXWidgetManagerComponent,
    AXWidgetContainerComponent,
    AXDateWidgetComponent,
    AXNoteWidgetComponent
  ],
  entryComponents: [
    AXWidgetManagerComponent, 
    AXWidgetPickerPage,    
    AXDateWidgetComponent,
    AXNoteWidgetComponent]
})
export class AXWidgetModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AXWidgetModule,
      providers: [AXWidgetService]
    };
  }
}
