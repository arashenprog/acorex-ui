import { Component, OnInit, ViewChild, Input, ElementRef, ViewEncapsulation, TemplateRef, ViewContainerRef, Renderer2 } from "@angular/core";
import { AXTextInputBaseComponent } from "../../../core/base.class";

@Component({
  selector: "ax-upload-file",
  templateUrl: "./upload-file.component.html",
  styleUrls: ["./upload-file.component.scss"],
  encapsulation: ViewEncapsulation.None
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


  @Input()
  @ViewChild(TemplateRef)
  public template: TemplateRef<any>;
  private overlayDiv: HTMLElement;
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

  constructor(
    private el: ElementRef<HTMLElement>,
    private viewContainerRef: ViewContainerRef,
    private rendrer: Renderer2) {
    super();
  }

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
  onInlineButtonClick(e) { }


  ngAfterViewInit(): void {
    if (this.dropRef != null) {
    }
    else {
      this.dropRef = this.el.nativeElement;
    }
    //
    this.dropRef.classList.add("ax-upload-drop-over");
    this.overlayDiv = this.rendrer.createElement("div") as HTMLElement;
    this.overlayDiv.classList.add("overlay");
    this.overlayDiv.innerText = "Drop Here";
    this.rendrer.appendChild(this.dropRef, this.overlayDiv);
    //
    this.dropRef.addEventListener("dragover", this.handleDragOver.bind(this));
    //
    this.dropRef.addEventListener("dragleave", this.handleDragLeave.bind(this));
    this.dropRef.addEventListener("drop", this.handleDrop.bind(this));
  }

  private handleDragOver(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    this.overlayDiv.classList.add("show");
  }

  private handleDragLeave(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    this.overlayDiv.classList.remove("show");
  }

  handleDrop(e: DragEvent) {
    this.handleDragLeave(e);
    for (let i = 0; i < e.dataTransfer.files.length; i++) {
      const file = e.dataTransfer.files[i];
      console.log(file);
    }
  }
}
