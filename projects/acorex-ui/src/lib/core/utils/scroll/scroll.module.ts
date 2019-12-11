import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AXHorizontalScrollDirective, AXVerticalScrollDirective } from "./scroll.directive";

@NgModule({
  declarations: [AXHorizontalScrollDirective, AXVerticalScrollDirective],
  imports: [CommonModule],
  exports: [AXHorizontalScrollDirective, AXVerticalScrollDirective],
  providers: []
})
export class AXScrollModule { }
