import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EventService } from "./event.service";
import { InjectionService } from "./injection.service";
import { TranslateService, TranslatePipe } from "./translate.service";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AXStorageService } from "./storage.service";
import { AXScrollModule } from "../core/utils/scroll/scroll.module";
import { AXDateTimePipe } from "../core/calendar/datatime.pipe";
import { AXGridLayoutModule } from "./../components/layout/grid-layout/grid.layout.module";

@NgModule({
  declarations: [TranslatePipe,AXDateTimePipe],
  imports: [CommonModule, FormsModule, BrowserAnimationsModule, AXScrollModule,AXGridLayoutModule],
  exports: [TranslatePipe, BrowserAnimationsModule, AXScrollModule,AXDateTimePipe,AXGridLayoutModule],
  providers: [
    EventService,
    InjectionService,
    TranslateService,
    AXStorageService
  ]
})
export class AXCoreModule {}
