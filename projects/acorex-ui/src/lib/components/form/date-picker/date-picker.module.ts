import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AXValidationModule } from '../validation/validation.module';
import { AXDropDownModule } from "../drop-down/drop-down.module";
import { AXCalendarBoxModule } from "../../calendar/calendar-box/calendar-box.module"
import { AXDatePickerComponent } from "./date-picker.component";
@NgModule({
  declarations: [AXDatePickerComponent ],
  imports: [CommonModule, FormsModule, AXDropDownModule, AXCalendarBoxModule, AXValidationModule],
  exports: [AXDatePickerComponent],
  providers: []
})
export class AXDatePickerModule { }
