import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AXDatePickerComponent } from "./date-picker.component";
import { AXValidationModule } from '../validation/validation.module';
import { AXDatePickerPersianComponent } from "./date-picker-persian";
import { AXDatePickerGregoriannComponent } from "./date-picker-gorgian";
import { AXDropDownModule } from "../drop-down/drop-down.module";
import { AXCalendarBoxModule } from "../../calendar/calendar-box/calendar-box.module"
@NgModule({
  declarations: [AXDatePickerComponent, AXDatePickerPersianComponent,AXDatePickerGregoriannComponent],
  imports: [CommonModule, FormsModule, AXDropDownModule,AXCalendarBoxModule, AXValidationModule],
  exports: [AXDatePickerComponent],
  providers: []
})
export class AXDatePickerModule { }
