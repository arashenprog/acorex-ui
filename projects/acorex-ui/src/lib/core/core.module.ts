import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EventService } from "./event.service";
import { InjectionService } from "./injection.service";
import { TranslateService, TranslatePipe } from "./translate.service";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AXStorageService } from "./storage.service";
import { AXScrollModule } from "../core/utils/scroll/scroll.module";

@NgModule({
  declarations: [TranslatePipe],
  imports: [CommonModule, FormsModule, BrowserAnimationsModule, AXScrollModule],
  exports: [TranslatePipe, BrowserAnimationsModule, AXScrollModule],
  providers: [
    EventService,
    InjectionService,
    TranslateService,
    AXStorageService
  ]
})
export class AXCoreModule {}
