import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AXSelectionListComponent } from "./selection-list.component";
import { AXCheckBoxModule } from '../checkbox/checkbox.module';
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [AXSelectionListComponent],
  imports: [CommonModule,FormsModule, AXCheckBoxModule],
  exports: [AXSelectionListComponent],
  providers: []
})
export class AXSelectionListModule { }
