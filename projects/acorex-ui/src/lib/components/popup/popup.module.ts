import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AXPopupComponent } from "./popup.component";
import { AXDialogComponent } from "./dialog.component";
import { AXButtonModule } from "../button/button.module";
@NgModule({
  declarations: [AXPopupComponent, AXDialogComponent],
  imports: [CommonModule, AXButtonModule],
  exports: [AXPopupComponent, AXDialogComponent],
  providers: []
})
export class AXPopupModule {}
