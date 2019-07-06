import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AXCalendarBoxComponent } from "./calendar-box.component";
import { AXPopoverModule } from "../../layout/popover/popover.module";

@NgModule({
  declarations: [AXCalendarBoxComponent],
  imports: [CommonModule, AXPopoverModule],
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
