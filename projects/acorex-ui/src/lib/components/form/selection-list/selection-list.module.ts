import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AXSelectionListComponent } from "./selection-list.component";
import { AXCheckBoxModule } from '../checkbox/checkbox.module';
import { AXRadioButtonModule } from '../radio-button/radio-button.module';

@NgModule({
  declarations: [AXSelectionListComponent],
  imports: [CommonModule, AXCheckBoxModule, AXRadioButtonModule],
  exports: [AXSelectionListComponent],
  providers: []
})
export class AXSelectionListModule { }
