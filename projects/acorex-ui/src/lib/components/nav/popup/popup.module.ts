import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AXPopupComponent } from "./popup.component";
import { AXDialogComponent } from "../dialog/dialog.component";
import { AXButtonModule } from "../../form/button/button.module";
import { AXPopupService } from './popup.service';
import { DialogService } from '../dialog/dialog.service';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {A11yModule} from '@angular/cdk/a11y';
@NgModule({
  declarations: [AXPopupComponent, AXDialogComponent],
  imports: [CommonModule, AXButtonModule,DragDropModule,A11yModule],
  exports: [AXPopupComponent, AXDialogComponent],
  entryComponents:[AXPopupComponent,AXDialogComponent],
  providers: [AXPopupService,DialogService]
})
export class AXPopupModule {}
