import { Component, OnInit, ViewChild, Input } from "@angular/core";

@Component({
  selector: "ax-upload-file",
  templateUrl: "./upload-file.component.html"
})
export class AXUploadFileComponent implements OnInit {
  @ViewChild("file") file;

  fileName: string = "";
  data: any;

  @Input()
  size: "sm" | "md" | "lg" = "md";

  @Input()
  type: "box" | "inline" = "box";

  inlineButtons: any[] = [
    {
      name: "upload",
      icon: "fas fa-plus",
      type: "success"
    },
    {
      name: "view",
      text: "نمایش",
      icon: "fas fa-eye",
      type: "primary",
      dropdown: true,
      visible: false
    },
    {
      name: "delete",
      text: "حذف",
      icon: "fas fa-trash-alt",
      type: "danger",
      dropdown: true,
      visible: false
    }
  ];
  constructor() {}

  ngOnInit(): void {}

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
        console.log(fileReader.result);
      },
      false
    );
    fileReader.readAsDataURL(item);
  }
  onFileChange(e) {
    let files = e.target.files;
    this.fileName = files[0].name;
    console.log(files);
    this.readFile(files[0]);
  }
  onInlineButtonClick(e) {
    console.log(e);
  }
}
