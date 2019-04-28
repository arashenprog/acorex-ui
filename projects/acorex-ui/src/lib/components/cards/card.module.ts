import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AXCardComponent } from "./card.component";
import { AXButtonModule } from "../button/button.module";
@NgModule({
  declarations: [AXCardComponent],
  imports: [CommonModule, AXButtonModule],
  exports: [AXCardComponent],
  providers: []
})
export class AXCardModule {}
