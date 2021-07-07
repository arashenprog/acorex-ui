import {
  Component,
  OnInit,
  Input,
  ViewChild,
  TemplateRef,
  ContentChild,
  EventEmitter,
  Output,
  ElementRef,
  HostListener,
  ViewContainerRef,
  ChangeDetectorRef,
  ViewEncapsulation
} from "@angular/core";

import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { AXSelectBaseComponent } from "../../../core/base.class";

@Component({
  selector: "ax-drop-down",
  templateUrl: "./drop-down.component.html",
  styleUrls: ["./drop-down.component.scss"],
  encapsulation: ViewEncapsulation.None,
  host: { style: 'display:contents;' }
})
export class AXDropDownComponent extends AXSelectBaseComponent {

  @Output()
  onOpen: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  onClose: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('baseTemplate') baseTemplate: TemplateRef<any>;

  @Output()
  dropdownToggle: EventEmitter<any> = new EventEmitter<any>();

  @HostListener('keydown', ['$event'])
  onKeydownHandler(e: KeyboardEvent) {
    if (!this.disabled && e.key === 'Enter' && e.type === 'keydown') {
      if (!this.readonly) {
        this.toggle();
      }
    }
    if (e.key === 'Escape') {
      if (this.isOpen) {
        this.close();
        e.stopPropagation();
      }
    }
  }


  @Input() icon: string = "fas fa-angle-down";
  @Input() fitParent: boolean = false;
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() rtl: boolean = null;

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

  @ViewChild('el', { static: true })
  dropdownEL: ElementRef<HTMLDivElement>;

  dropdownWidth: number;
  private overlayRef: OverlayRef;
  private templatePortal: TemplatePortal;

  constructor(private cdr: ChangeDetectorRef,
    private ref: ElementRef<HTMLDivElement>,
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef
  ) {
    super();
  }

  focus(): void { }

  handleDropdownButtonClick(e: MouseEvent) {
    if (this.disabled || this.readonly) {
      return;
    }
    setTimeout(() => {
      this.toggle();
    }, 0);
  }




  toggle() {
    if (this.disabled !== true) {
      this.isOpen ? this.close() : this.open();
    }
  }

  close() {
    if (!this.isOpen) {
      return;
    }
    if (this.overlayRef) this.overlayRef.detach();
    this.onClose.emit();
    this.dropdownToggle.emit({ mode: 'close' });
  }

  open() {
    if (this.isOpen) {
      return;
    }
    if (this.fitParent === true) {
      this.dropdownWidth = this.dropdownEL.nativeElement.offsetWidth;
    } else {
      this.dropdownWidth = null;
    }
    this.ensureOverlayCreated();
    this.overlayRef.attach(this.templatePortal);
    this.onOpen.emit();
    this.dropdownToggle.emit({ mode: 'open' });
  }

  ngOnInit(): void {
    if (this.rtl == null) {
      this.rtl = window.getComputedStyle(this.ref.nativeElement, null).getPropertyValue('direction') === 'rtl';
    }
    setTimeout(() => {
      this.ref.nativeElement.classList.add(this.rtl ? 'rtl' : 'ltr');
      this.dropdownEL.nativeElement.classList.add(this.rtl ? 'rtl' : 'ltr')
    }, 5);
  }

  ngAfterViewInit() {

  }



  ngOnDestroy() {
    if (this.overlayRef) {
      this.overlayRef.detach()
      this.overlayRef.dispose();
    }
  }

  private ensureOverlayCreated() {
    if (!this.overlayRef) {
      const targetEl = document.querySelector<HTMLElement>('#' + this._uid);
      const positionStrategy = this.overlay.position()
        .flexibleConnectedTo(targetEl)
        .withPositions([
          {
            originX: 'start',
            originY: 'bottom',
            overlayX: 'start',
            overlayY: 'top'
          },
          {
            originX: 'start',
            originY: 'bottom',
            overlayX: 'start',
            overlayY: 'bottom'
          },
          {
            originX: 'end',
            originY: 'bottom',
            overlayX: 'end',
            overlayY: 'top'
          },
          {
            originX: 'end',
            originY: 'bottom',
            overlayX: 'end',
            overlayY: 'bottom'
          }
        ])
        .withPush(false);
      this.overlayRef = this.overlay.create({
        positionStrategy,
        //width: this.dropdownEL.nativeElement.clientWidth,
        scrollStrategy: this.overlay.scrollStrategies.reposition({
          autoClose: true
        }),
        hasBackdrop: true,
        backdropClass: 'cdk-overlay-transparent-backdrop'
      });
      this.overlayRef.setDirection(this.rtl ? 'rtl' : 'ltr');
      this.overlayRef.backdropClick().subscribe(() => this.close());
    }
    if (!this.templatePortal) {
      this.templatePortal = new TemplatePortal(this.baseTemplate, this.viewContainerRef);
    }
  }

  get isOpen(): boolean {

    return this.overlayRef ? this.overlayRef.hasAttached() : false;
  }

  updateLayout() {
    if (this.overlayRef)
    {
      this.overlayRef.detach();
      setTimeout(() => {
        this.overlayRef.attach(this.templatePortal);
      }, 200);
      
    }
  }
}
