import { NgModule } from "@angular/core";

import { CommonModule } from "@angular/common";
import { AXDropDownComponent } from "./drop-down.component"
import { NgSelectModule } from "@ng-select/ng-select";
import { FormsModule } from "@angular/forms";
import { AXPopoverModule } from "../../layout/popover/popover.module";
@NgModule({
  declarations: [AXDropDownComponent],
  imports: [CommonModule, NgSelectModule, FormsModule, AXPopoverModule],
  exports: [AXDropDownComponent],
  providers: []
})
export class AXDropDownModule { }
