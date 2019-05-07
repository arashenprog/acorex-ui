import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AXContainerComponent } from "./container/container.component";
import { AXRowComponent } from "./row/row.component";
import { AXColComponent } from "./col/col.component";
import {
  AXDisplay,
  AXColLgDirective,
  AXColMdDirective,
  AXColSmDirective,
  AXColXlDirective
} from "./col/col.directive";
@NgModule({
  declarations: [
    AXContainerComponent,
    AXRowComponent,
    AXColComponent,
    AXDisplay,
    AXColLgDirective,
    AXColMdDirective,
    AXColSmDirective,
    AXColXlDirective
  ],
  imports: [CommonModule],
  exports: [
    AXContainerComponent,
    AXRowComponent,
    AXColComponent,
    AXDisplay,
    AXColLgDirective,
    AXColMdDirective,
    AXColSmDirective,
    AXColXlDirective
  ],
  providers: []
})
export class AXGridLayoutModule {}
