import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AXTextAreaComponent } from "./text-area.component";
import { FormsModule } from "@angular/forms";
import { TextMaskModule } from "angular2-text-mask";
import { AXValidationModule } from "../validation/validation.module";
@NgModule({
  declarations: [AXTextAreaComponent],
  imports: [CommonModule, FormsModule, TextMaskModule, AXValidationModule],
  exports: [AXTextAreaComponent],
  providers: []
})
export class AXTextAreaModule {}
