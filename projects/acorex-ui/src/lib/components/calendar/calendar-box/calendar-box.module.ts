import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AXCalendarBoxComponent } from "./calendar-box.component";
import { AXPopoverModule } from "../../layout/popover/popover.module";
import { AXButtonModule } from "../../form/button/button.module";
import { AXCoreModule } from '../../../core/core.module';



@NgModule({
  declarations: [AXCalendarBoxComponent],
  imports: [CommonModule,AXCoreModule,AXButtonModule, AXPopoverModule],
  exports: [AXCalendarBoxComponent],
  providers: []
})
export class AXCalendarBoxModule {
/**
 *
 */
  constructor() {
  }

}
