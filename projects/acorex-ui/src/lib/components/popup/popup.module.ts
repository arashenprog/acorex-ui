import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AXPopupComponent } from "./popup.component";
import { AXDialogComponent } from "./dialog.component";
import { AXButtonModule } from "../button/button.module";
import { InjectionService } from '../../services/InjectionService';
@NgModule({
  declarations: [AXPopupComponent, AXDialogComponent],
  imports: [CommonModule, AXButtonModule],
  exports: [AXPopupComponent, AXDialogComponent],
  entryComponents:[AXPopupComponent,AXDialogComponent],
  providers: [InjectionService]
})
export class AXPopupModule {}
