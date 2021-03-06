import { Component, OnInit } from "@angular/core";
import {
  AXBasePageComponent,
  AXUploadFileLoadEvent,
  AXUploadFileProgressEvent,
  AXSeparatorPipe
} from "acorex-ui";

@Component({
  templateUrl: "./uploader-page.component.html"
})
export class UploaderPage extends AXBasePageComponent {
  showTooltip: boolean = true;
  sampleNumber: number = 1000000000;
  stringNumber: string = "";

  constructor(private separator: AXSeparatorPipe) {
    super();
  }
  ngOnInit() { }
  onFileLoad(e: AXUploadFileLoadEvent) { }

  onFileProgress(e: AXUploadFileProgressEvent) { }

  aalert(e) {
    alert(e);
  }

  spanClick() {
    this.showTooltip = false;
  }

  items: any[] = [
    {
      value: 0,
      text: "items 1"
    },
    {
      value: 1,
      text: "items 2"
    },
    {
      value: 2,
      text: "items 3"
    }
  ];

  selectedValues: any[] = [1];

  handleOnKey(e) {
    let s = this.separator.transform(this.stringNumber);
    console.log(s, "separator");
  }
}
