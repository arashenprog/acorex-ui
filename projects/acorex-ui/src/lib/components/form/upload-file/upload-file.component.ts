import { Component, OnInit, ViewChild, Input, ElementRef } from "@angular/core";
import { AXTextInputBaseComponent } from "../../../core/base.class";

@Component({
  selector: "ax-upload-file",
  templateUrl: "./upload-file.component.html",
  styleUrls: ["./upload-file.component.scss"]
})
export class AXUploadFileComponent extends AXTextInputBaseComponent {
  fileName: string = "";
  data: any;

  @Input()
  dropRef: HTMLElement;

  @Input()
  progressRef: HTMLElement;

  @ViewChild("file") file;

  @Input()
  type: "box" | "inline" | "hidden" = "box";

  inlineButtons: any[] = [
    {
      name: "upload",
      icon: "fas fa-plus",
      type: "success"
    },
    {
      name: "view",
      text: "View",
      icon: "fas fa-eye",
      type: "primary",
      dropdown: true,
      visible: false
    },
    {
      name: "delete",
      text: "Delete",
      icon: "fas fa-trash-alt",
      type: "danger",
      dropdown: true,
      visible: false
    }
  ];

  onUploadClick() {
    let _file = this.file.nativeElement;
    if (!this.data) {
      _file.click();
    }
  }
  onUploadButtonClick() {
    let _file = this.file.nativeElement;
    _file.click();
  }
  onDeleteClick(e) {
    e.stopPropagation();
    this.data = "";
  }
  readFile(item: any) {
    let fileReader = new FileReader();
    fileReader.addEventListener(
      "load",
      () => {
        this.data = fileReader.result;
      },
      false
    );
    fileReader.readAsDataURL(item);
  }
  onFileChange(e) {
    let files = e.target.files;
    this.fileName = files[0].name;
    this.readFile(files[0]);
  }
  onInlineButtonClick(e) {}

  ngAfterViewInit(): void {
    debugger;
    if (this.dropRef != null) {
      this.dropRef.addEventListener("dragover", this.handleDragOver.bind(this));
      this.dropRef.addEventListener("drop", this.handleDrop.bind(this));
    }
  }

  handleDragOver(e: DragEvent) {
    console.log(e);
    e.stopPropagation();
    e.preventDefault();
  }

  handleDrop(e: DragEvent) {
    debugger;
    console.log(e);
    e.stopPropagation();
    e.preventDefault();
  }
}
