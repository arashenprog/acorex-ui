import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AXValidationFormComponent } from "./validation-form.component";
import { AXValidation } from "./validation.widget";
import { AXValidations } from "./validations.widget";

@NgModule({
  declarations: [AXValidationFormComponent, AXValidations, AXValidation],
  imports: [CommonModule],
  exports: [AXValidationFormComponent,AXValidations, AXValidation],
  providers: []
})
export class AXValidationModule {}
