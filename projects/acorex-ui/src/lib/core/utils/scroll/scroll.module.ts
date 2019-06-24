import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AXHorizontalScrollDirective } from "./scroll.directive";

@NgModule({
  declarations: [AXHorizontalScrollDirective],
  imports: [CommonModule],
  exports: [AXHorizontalScrollDirective],
  providers: []
})
export class AXScrollModule {}
