import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AXHtmlToTextPipe } from "./htmlToText.pipe";

@NgModule({
  declarations: [AXHtmlToTextPipe],
  imports: [CommonModule],
  exports: [AXHtmlToTextPipe],
  providers: []
})
export class AXHtmlModule {}
