import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AXSelectBoxComponent } from "./select-box.component";
import { FormsModule } from "@angular/forms";
import { AXDropDownModule } from "../drop-down/drop-down.module";
@NgModule({
  declarations: [AXSelectBoxComponent],
  imports: [CommonModule, FormsModule, AXDropDownModule],
  exports: [AXSelectBoxComponent],
  providers: []
})
export class AXSelectBoxModule { }
