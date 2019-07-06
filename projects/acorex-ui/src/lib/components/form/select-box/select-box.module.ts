import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AXSelectBoxComponent } from "./select-box.component";
import { NgSelectModule } from "@ng-select/ng-select";
import { FormsModule } from "@angular/forms";
import { AXPopoverModule } from "../../layout/popover/popover.module";
@NgModule({
  declarations: [AXSelectBoxComponent],
  imports: [CommonModule, NgSelectModule, FormsModule, AXPopoverModule],
  exports: [AXSelectBoxComponent],
  providers: []
})
export class AXSelectBoxModule { }
