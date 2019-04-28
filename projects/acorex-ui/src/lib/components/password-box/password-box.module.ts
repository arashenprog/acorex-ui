import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AXPasswordBoxComponent } from "./password-box.component";
import { AXButtonModule } from "../button/button.module";
@NgModule({
  declarations: [AXPasswordBoxComponent],
  imports: [CommonModule, AXButtonModule],
  exports: [AXPasswordBoxComponent],
  providers: []
})
export class AXPasswordBoxModule {}
