import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AXSepratorPipe } from "./seprator.pipe";

@NgModule({
  declarations: [AXSepratorPipe],
  imports: [CommonModule],
  exports: [AXSepratorPipe],
  providers: []
})
export class AXSepratorModule {}
