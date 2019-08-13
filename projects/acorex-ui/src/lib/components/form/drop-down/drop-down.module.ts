import { NgModule } from "@angular/core";

import { CommonModule } from "@angular/common";
import { AXDropDownComponent } from "./drop-down.component"
import { FormsModule } from "@angular/forms";
import { AXPopoverModule } from "../../layout/popover/popover.module";
@NgModule({
  declarations: [AXDropDownComponent],
  imports: [CommonModule, FormsModule, AXPopoverModule],
  exports: [AXDropDownComponent],
  providers: []
})
export class AXDropDownModule { }
