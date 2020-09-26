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
import { throws } from "assert";

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
    if (this.popup) {
      const p = this.popup.nativeElement;
      p.style.display = 'block';
      const popupBound = this.popup.nativeElement.getBoundingClientRect();
      this.ff.nativeElement.style.width = this.el.nativeElement.getBoundingClientRect().width + 'px';
      const elBound = this.ff.nativeElement.getBoundingClientRect();

      if (this.fitParent == true) {
        p.style.width = `${elBound.width}px`;
      }
      let top = elBound.top + window.scrollY;
      p.style.top = `${top}px`;

      const offset = this.getOffset(this.el.nativeElement);
      let left = offset.left - this.getLeftScroll(this.el.nativeElement);
      p.style.left = `${left}px`;

      p.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" })


      // if (right > window.outerWidth) {
      //   p.style.transform = `translateX(${window.outerWidth - right - 10}px)`;
      //   //p.style.left = `${elBound.left - Math.abs(window.outerWidth - popupBound.right - 10)}px`;
      // }

      // if (popupBound.bottom > window.outerHeight) {
      //   p.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
      // }
      this.isOpened = true;
      this.onOpen.emit();
    }
  }

  public close() {
    if (this.popup) {
      this.popup.nativeElement.style.display = 'none';
      this.isOpened = false;
      this.onClose.emit();
    }
  }

  ngAfterViewInit() {
    document.body.appendChild(this.popup.nativeElement);
  }


  private closeOutsideListener(e: MouseEvent) {
    if (!this.el.nativeElement.contains(<any>e.target)) {
      this.close()
    }
  }

  ngOnDestroy() {
    window.removeEventListener('click', this.closeOutsideListener.bind(this));
    this.popup.nativeElement.remove();
  }

  getOffset(el) {
    var _x = 0;
    var _y = 0;
    while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
      _x += el.offsetLeft - el.scrollLeft;
      _y += el.offsetTop - el.scrollTop;
      el = el.offsetParent;
    }
    return { top: _y, left: _x };
  }

  getLeftScroll(el) {
    while (el && !isNaN(el.scrollLeft)) {
      if (el.scrollLeft > 0)
        return el.scrollLeft;
      el = el.parentElement;
    }
    return 0;
  }



}
