import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AXSeparatorPipe } from "./separator.pipe";

@NgModule({
  declarations: [AXSeparatorPipe],
  imports: [CommonModule],
  exports: [AXSeparatorPipe],
  providers: []
})
export class AXSeparatorModule { }
