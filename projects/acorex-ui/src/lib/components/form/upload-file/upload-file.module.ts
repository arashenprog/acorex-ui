import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AXUploadFileComponent } from "./upload-file.component";
import { AXButtonModule } from "../button/button.module";
import { AXTextBoxModule } from '../text-box/text-box.module';
import { AXProgressBarModule } from "../../layout/progress-bar/progress-bar.module";

@NgModule({
  declarations: [AXUploadFileComponent],
  imports: [CommonModule, AXButtonModule, AXTextBoxModule,AXProgressBarModule],
  exports: [AXUploadFileComponent],
  providers: []
})
export class AXUploadFileModule { }
