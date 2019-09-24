import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AXEditorComponent } from "./editor.component";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [AXEditorComponent],
  imports: [CommonModule, FormsModule],
  exports: [AXEditorComponent],
  providers: []
})
export class AXEditorModule {}
