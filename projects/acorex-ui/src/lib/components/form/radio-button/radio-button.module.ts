import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AXRadioButton } from "./radio-button.component";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [AXRadioButton],
  imports: [CommonModule,FormsModule],
  exports: [AXRadioButton],
  providers: []
})
export class AXRadioButtonModule {}
