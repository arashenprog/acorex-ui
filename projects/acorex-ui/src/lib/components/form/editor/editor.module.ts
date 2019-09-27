import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AXEditorComponent } from "./editor.component";
import { FormsModule } from "@angular/forms";
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
@NgModule({
  declarations: [AXEditorComponent],
  imports: [CommonModule, FormsModule,CKEditorModule],
  exports: [AXEditorComponent],
  providers: []
})
export class AXEditorModule {}
