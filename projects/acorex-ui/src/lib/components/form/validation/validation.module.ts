import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AXValidationFormComponent } from "./validation-form.component";
import { AXValidationRule } from "./validation-rule.widget";
import { AXValidationComponent } from "./validation.component";

@NgModule({
  declarations: [AXValidationFormComponent, AXValidationComponent, AXValidationRule],
  imports: [CommonModule],
  exports: [AXValidationFormComponent,AXValidationComponent, AXValidationRule],
  providers: []
})
export class AXValidationModule {}
