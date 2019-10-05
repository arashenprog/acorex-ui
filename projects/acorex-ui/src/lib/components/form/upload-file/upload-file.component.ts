import { Component, OnInit, ViewChild, Input, ElementRef, ViewEncapsulation, TemplateRef, ViewContainerRef, Renderer2, EventEmitter, Output } from "@angular/core";
import { AXTextInputBaseComponent } from "../../../core/base.class";
import { InjectionService } from "../../../core/injection.service";
import { AXProgressBarComponent } from "../../layout/progress-bar/progress-bar.component";
import { AXUploadFileLoadEvent, AXUploadFileProgressEvent } from "./upload-file.events";
import { Observable } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";

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

  @ViewChild("fileInput") fileInput: ElementRef<HTMLInputElement>;

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
  private dragOverObserver: any;

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

  onUploadClick() {
    let _file = this.fileInput.nativeElement;
    // if (!this.data) {
    //   _file.click();
    // }
    _file.click();
  }

  onUploadButtonClick() {
    let _file = this.fileInput.nativeElement;
    _file.click();
  }

  onDeleteClick(e) {
    e.stopPropagation();
  }

  readFile(item: any) {
    let fileReader = new FileReader();
    fileReader.addEventListener(
      "load",
      () => {
      },
      false
    );
    fileReader.readAsDataURL(item);
  }

  onFileChange(e) {
    let files = e.target.files;
    this.readFile(files[0]);
  }

  onInlineButtonClick(e) { }


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
    this.dropRef.classList.add("dd");
    this.overlayDiv.classList.add("show");
  }

  private handleDragLeave(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();

    if (!this.dragOverObserver) {
      Observable.create(observer => {
        this.dragOverObserver = observer;
      })
        .pipe(debounceTime(500))
        .pipe(distinctUntilChanged())
        .subscribe(c => {
          console.log("drag leave");
          this.overlayDiv.classList.remove("show");
          this.dropRef.classList.remove("dd");
        });
    }
    this.dragOverObserver.next(e.timeStamp);
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
