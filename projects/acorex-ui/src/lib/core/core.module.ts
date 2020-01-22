import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EventService } from "./event.service";

import { TranslateService, TranslatePipe } from "./translate.service";
import { FormsModule } from "@angular/forms";
import { AXStorageService } from "./storage.service";
import { AXScrollModule } from "../core/utils/scroll/scroll.module";
import { AXDateTimePipe } from "../core/calendar/datatime.pipe";
import { AXGridLayoutModule } from "./../components/layout/grid-layout/grid.layout.module";
import { AXComponentFactoryService } from "./component-factory.service";

@NgModule({
  declarations: [TranslatePipe,AXDateTimePipe],
  imports: [
    CommonModule, 
    FormsModule, 
    AXScrollModule,
    AXGridLayoutModule
  ],
  exports: [TranslatePipe, AXScrollModule,AXDateTimePipe,AXGridLayoutModule],
  providers: [
    EventService,
    AXComponentFactoryService,
    TranslateService,
    AXStorageService
  ]
})
export class AXCoreModule {}
