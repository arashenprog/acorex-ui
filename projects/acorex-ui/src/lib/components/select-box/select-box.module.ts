import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AXSelectBoxComponent } from "./select-box.component";
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [AXSelectBoxComponent],
  imports: [CommonModule,NgSelectModule],
  exports: [AXSelectBoxComponent],
  providers: []
})
export class AXSelectBoxModule {}
