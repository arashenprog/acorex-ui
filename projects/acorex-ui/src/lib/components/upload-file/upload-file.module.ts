import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AXUploadFileComponent } from "./upload-file.component";
import { AXButtonModule } from "../button/button.module";
import { AXTextBoxModule } from '../text-box/text-box.module';

@NgModule({
  declarations: [AXUploadFileComponent],
  imports: [CommonModule, AXButtonModule, AXTextBoxModule],
  exports: [AXUploadFileComponent],
  providers: []
})
export class AXUploadFileModule { }
