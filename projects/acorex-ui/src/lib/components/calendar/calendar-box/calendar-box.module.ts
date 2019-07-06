import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AXCalendarBoxComponent } from "./calendar-box.component";
import { AXPopoverModule } from "../../layout/popover/popover.module";
import { AXCoreModule } from '../../../core/core.module';



@NgModule({
  declarations: [AXCalendarBoxComponent],
  imports: [CommonModule,AXCoreModule, AXPopoverModule],
  exports: [AXCalendarBoxComponent],
  providers: []
})
export class AXCalendarBoxModule {}
