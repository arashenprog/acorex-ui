import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AXPasswordBoxComponent } from "./password-box.component";
import { AXButtonModule } from "../button/button.module";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [AXPasswordBoxComponent],
  imports: [CommonModule, AXButtonModule,FormsModule],
  exports: [AXPasswordBoxComponent],
  providers: []
})
export class AXPasswordBoxModule {}
