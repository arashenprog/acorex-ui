import { Component, OnInit } from "@angular/core";
import { AXBasePageComponent, AXUploadFileLoadEvent, AXUploadFileProgressEvent } from "acorex-ui";

@Component({
  templateUrl: "./uploader-page.component.html"
})
export class UploaderPage extends AXBasePageComponent {

  onFileLoad(e: AXUploadFileLoadEvent) {
    debugger;
    console.log(e);
  }

  onFileProgress(e: AXUploadFileProgressEvent) {
    debugger;
    console.log(e);

  }

  aalert(e)
  {
    alert(e);
  }

}
