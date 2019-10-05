import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AXProgressBarComponent } from "./progress-bar.component";

@NgModule({
  declarations: [AXProgressBarComponent],
  imports: [CommonModule],
  exports: [AXProgressBarComponent],
  entryComponents:[AXProgressBarComponent],
  providers: []
})
export class AXProgressBarModule {}
