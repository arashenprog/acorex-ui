import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AXPasswordBoxComponent } from "./password-box.component";
import { AXButtonModule } from "../button/button.module";
import { FormsModule } from "@angular/forms";
import { AXValidationModule } from '../validation/validation.module';

@NgModule({
  declarations: [AXPasswordBoxComponent],
  imports: [CommonModule, AXButtonModule,FormsModule,AXValidationModule],
  exports: [AXPasswordBoxComponent],
  providers: []
})
export class AXPasswordBoxModule {}
