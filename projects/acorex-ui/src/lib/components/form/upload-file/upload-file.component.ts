import { Component, OnInit, ViewChild, Input, ElementRef, ViewEncapsulation, TemplateRef, ViewContainerRef, Renderer2, EventEmitter, Output } from "@angular/core";
import { AXTextInputBaseComponent } from "../../../core/base.class";
import { InjectionService } from "../../../core/injection.service";
import { AXProgressBarComponent } from "../../layout/progress-bar/progress-bar.component";
import { AXUploadFileLoadEvent, AXUploadFileProgressEvent } from "./upload-file.events";

@Component({
  selector: "ax-upload-file",
  templateUrl: "./upload-file.component.html",
  styleUrls: ["./upload-file.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class AXUploadFileComponent extends AXTextInputBaseComponent {

  @Input()
  dropRef: HTMLElement;

  @Input()
  progressRef: HTMLElement;

  @ViewChild("fileInput") fileInput: ElementRef;

  @Input()
  type: "box" | "inline" | "hidden" = "box";


  @Input()
  @ViewChild(TemplateRef)
  public template: TemplateRef<any>;
  private overlayDiv: HTMLElement;

  @Output()
  onLoad: EventEmitter<AXUploadFileLoadEvent> = new EventEmitter<AXUploadFileLoadEvent>();
  @Output()
  onProgress: EventEmitter<AXUploadFileProgressEvent> = new EventEmitter<AXUploadFileProgressEvent>();
  //
  files: File[] = [];

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
    private injectionService: InjectionService,
    private rendrer: Renderer2) {
    super();
  }


  onDeleteClick(e) {
    e.stopPropagation();
  }


  onFileChange(e) {
    let files = e.target.files;
    this.addFile(files[0]);
    (this.fileInput.nativeElement as HTMLInputElement).value = null;
  }


  open() {
    this.fileInput.nativeElement.click();
  }


  ngAfterViewInit(): void {
    if (this.dropRef != null) {
    }
    else {
      this.dropRef = this.el.nativeElement;
    }
    //
    if (this.progressRef != null) {
    }
    else {
      this.progressRef = this.el.nativeElement;
    }
    //
    this.overlayDiv = this.rendrer.createElement("div") as HTMLElement;
    this.overlayDiv.classList.add("overlay");
    this.overlayDiv.innerHTML = `
      <div class="icon-wrapper">
        <i class="fas fa-cloud-upload-alt fa-3x"></i>
        <span>Drop File(s) Here</span>
      </div>
    `;
    this.overlayDiv.addEventListener("drag",this.handleOverlayDragOver);
    this.overlayDiv.addEventListener("dragover",this.handleOverlayDragOver);
    this.overlayDiv.addEventListener("dragleave",this.handleOverlayDragOver);
    this.rendrer.appendChild(this.dropRef, this.overlayDiv);
    //
    this.dropRef.classList.add("ax-upload-drop-over");
    this.dropRef.addEventListener("dragover", this.handleDragOver.bind(this));
    this.dropRef.addEventListener("dragleave", this.handleDragLeave.bind(this));
    this.dropRef.addEventListener("drop", this.handleDrop.bind(this));
  }


  private handleOverlayDragOver(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }

  private handleDragOver(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    this.overlayDiv.classList.add("show");
    return false;
  }

  private handleDragLeave(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    this.overlayDiv.classList.remove("show");
    return false;
  }

  handleDrop(e: DragEvent) {
    this.handleDragLeave(e);
    for (let i = 0; i < e.dataTransfer.files.length; i++) {
      const file = e.dataTransfer.files[i];
      this.addFile(file);
    }
  }


  private addFile(file: File) {
    const progressDiv = this.rendrer.createElement("div") as HTMLElement;
    progressDiv.classList.add("ax-upload-progress-panel");
    const progressLabel = this.rendrer.createElement("small") as HTMLElement;
    progressLabel.innerText = file.name;
    this.rendrer.appendChild(this.progressRef, progressDiv);
    let com = this.injectionService.appendComponent(AXProgressBarComponent, { progress: 0 }, progressDiv).instance as AXProgressBarComponent;
    this.rendrer.appendChild(progressDiv, progressLabel);

    const reader = new FileReader();
    reader.addEventListener("load", (e) => {
      this.onLoad.emit({
        file: file,
        data: (<any>e).target.result,
      });
      //
      //Fake Upload
      let pv = 0;
      let uploaded = 0
      const intv = setInterval(() => {
        uploaded += 1024 * 1000;
        if (uploaded > e.total)
          uploaded = e.total;
        pv = Math.ceil(uploaded / e.total * 100);
        com.progress = pv;
        this.onProgress.emit({
          file: file,
          total: e.total,
          uploaded: uploaded,
          value: pv
        })
        //
        if (com.progress >= 100) {
          clearInterval(intv);
          setTimeout(() => {
            this.rendrer.removeChild(this.progressRef, progressDiv)
          }, 1000);
        }
      }, 100);
    });
    reader.readAsDataURL(file);
    this.files.push(file);
  }


}
