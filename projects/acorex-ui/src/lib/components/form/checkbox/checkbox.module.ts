import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { AXCheckBoxComponent } from "./checkbox.component";
@NgModule({
  declarations: [AXCheckBoxComponent],
  imports: [CommonModule,FormsModule],
  exports: [AXCheckBoxComponent],
  providers: []
})
export class AXCheckBoxModule {}
