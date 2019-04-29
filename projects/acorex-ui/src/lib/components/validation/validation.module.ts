import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AXValidationFormComponent } from "./validation-form.component";
import { AXValidationRule } from "./validation-rule.widget";
import { AXValidations } from "./validation.component";

@NgModule({
  declarations: [AXValidationFormComponent, AXValidations, AXValidationRule],
  imports: [CommonModule],
  exports: [AXValidationFormComponent,AXValidations, AXValidationRule],
  providers: []
})
export class AXValidationModule {}
