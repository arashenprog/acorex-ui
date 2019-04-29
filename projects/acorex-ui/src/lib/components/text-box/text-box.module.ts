import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AXTextBoxComponent } from "./text-box.component";
import { FormsModule } from "@angular/forms";
import { TextMaskModule } from "angular2-text-mask";
import { AXValidationModule } from "../validation/validation.module";
@NgModule({
  declarations: [AXTextBoxComponent],
  imports: [CommonModule, FormsModule, TextMaskModule, AXValidationModule],
  exports: [AXTextBoxComponent],
  providers: []
})
export class AXTextBoxModule {}
