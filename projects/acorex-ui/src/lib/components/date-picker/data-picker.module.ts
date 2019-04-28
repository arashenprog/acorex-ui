import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AXDatePickerComponent } from "./date-picker.component";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [AXDatePickerComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule,NgbModule],
  exports: [AXDatePickerComponent],
  providers: []
})
export class AXDataPickerModule {}
