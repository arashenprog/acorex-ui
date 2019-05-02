import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AXPopupComponent } from "./popup.component";
import { AXDialogComponent } from "./dialog.component";
import { AXButtonModule } from "../button/button.module";
import { PopupService } from './popup.service';
import { DialogService } from './dialog.service';
@NgModule({
  declarations: [AXPopupComponent, AXDialogComponent],
  imports: [CommonModule, AXButtonModule],
  exports: [AXPopupComponent, AXDialogComponent],
  entryComponents:[AXPopupComponent,AXDialogComponent],
  providers: [PopupService,DialogService]
})
export class AXPopupModule {}
