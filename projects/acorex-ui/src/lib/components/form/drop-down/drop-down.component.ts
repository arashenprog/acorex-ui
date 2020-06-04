import {
  Component,
  OnInit,
  Input,
  ViewChild,
  TemplateRef,
  ContentChild,
  EventEmitter,
  Output,
  ElementRef
} from "@angular/core";
import { SelectItem } from "../../../core/select.class";
import { AXSelectBaseComponent } from "../../../core/base.class";

@Component({
  selector: "ax-drop-down",
  templateUrl: "./drop-down.component.html",
  styleUrls: ["./drop-down.component.scss"]
})
export class AXDropDownComponent extends AXSelectBaseComponent {
  @Output()
  onOpen: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  onClose: EventEmitter<void> = new EventEmitter<void>();


  @ViewChild('popup')
  popup: ElementRef<HTMLDivElement>;
  @ViewChild('ff')
  ff: ElementRef<HTMLDivElement>;

  @Input() items: SelectItem[] = [];
  @Input() allowSearch: boolean = false;
  @Input() icon: string = "fas fa-angle-down";
  @Input() fitParent: boolean = false;
  isOpened: boolean = false;

  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;

  @ContentChild("editorTemplate", { static: true })
  _contentEditorTemplate: TemplateRef<any>;

  private _editorTemplate: TemplateRef<any>;
  @Input()
  public get editorTemplate(): TemplateRef<any> {
    return this._editorTemplate
      ? this._editorTemplate
      : this._contentEditorTemplate;
  }
  public set editorTemplate(v: TemplateRef<any>) {
    this._editorTemplate = v;
  }

  constructor(private el: ElementRef<HTMLElement>) {
    super();
    //
    window.addEventListener('click', this.closeOutsideListener.bind(this), { passive: true });
  }

  focus(): void { }

  handleDropdownButtonClick(e: MouseEvent) {
    if (this.disabled || this.readonly) {
      return;
    }
    //e.stopPropagation();
    e.preventDefault();
    this.toggle();
  }

  handlePopupClick(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
  }


  toggle(): void {
    if (!this.isOpened) {
      this.open();
    }
    else {
      this.close();
    }
  }

  public open() {
    debugger;
    const p = this.popup.nativeElement;
    p.style.display = 'block';
    const popupBound = this.popup.nativeElement.getBoundingClientRect();
    const elBound = this.ff.nativeElement.getBoundingClientRect();
    if (this.fitParent == true) {
      p.style.width = `${elBound.width}px`;
    }
    let top = elBound.height;
    p.style.top = `${top}px`;
    if (popupBound.bottom > window.innerHeight) {
      p.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
    }
    if (popupBound.right > window.innerWidth) {
      p.style.transform = `translateX(${window.innerWidth - popupBound.right - 10}px)`;
    }
    this.isOpened = true;
    this.onOpen.emit();
  }

  public close() {
    this.popup.nativeElement.style.display = 'none';
    this.isOpened = false;
    this.onClose.emit();
  }

  ngAdterViewInit() { }


  private closeOutsideListener(e: MouseEvent) {
    if (!this.el.nativeElement.contains(<any>e.target)) {
      this.close()
    }
  }

  ngOnDestroy() {
    window.removeEventListener('click', this.closeOutsideListener.bind(this));
  }

}
