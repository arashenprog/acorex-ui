import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AXDatePickerComponent } from "./date-picker.component";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AXValidationModule } from '../validation/validation.module';
import { AXDatePickerPersianComponent } from "./date-picker-persian";
import { AXDatePickerGregoriannComponent } from "./date-picker-gorgian";
@NgModule({
  declarations: [AXDatePickerComponent, AXDatePickerPersianComponent,AXDatePickerGregoriannComponent],
  imports: [CommonModule, FormsModule, NgbModule, AXValidationModule],
  exports: [AXDatePickerComponent],
  providers: []
})
export class AXDatePickerModule { }
