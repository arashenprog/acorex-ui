import { Component, OnInit } from "@angular/core";
import { AXBasePageComponent, AXUploadFileLoadEvent, AXUploadFileProgressEvent } from "acorex-ui";

@Component({
  templateUrl: "./uploader-page.component.html"
})
export class UploaderPage extends AXBasePageComponent {

  onFileLoad(e: AXUploadFileLoadEvent) {
    debugger;
  }

  onFileProgress(e: AXUploadFileProgressEvent) {
    debugger;

  }

  aalert(e)
  {
    alert(e);
  }

}
