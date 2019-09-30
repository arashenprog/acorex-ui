import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { AXEditorComponent } from "./editor.component";

@NgModule({
  declarations: [AXEditorComponent],
  imports: [CommonModule, FormsModule, CKEditorModule],
  exports: [AXEditorComponent],
  providers: []
})
export class AXEditorModule {}
