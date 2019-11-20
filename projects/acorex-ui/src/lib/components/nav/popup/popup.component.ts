import {
  Component,
  Input,
  EventEmitter,
  ViewChild,
  ViewContainerRef,
  OnInit,
  ComponentFactoryResolver,
  ViewEncapsulation,
  HostListener,
  ElementRef,
  ComponentRef,
  OnDestroy,
  ChangeDetectorRef,
  NgZone
} from "@angular/core";
import { ClosingEventArgs } from "./popup.events";

@Component({
  selector: "ax-popup",
  templateUrl: "./popup.component.html",
  styleUrls: ["./popup.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class AXPopupComponent implements OnInit, OnDestroy {
  @ViewChild("popupBody", /* TODO: add static flag */ { read: ViewContainerRef })
  private popupBody: ViewContainerRef;

  @ViewChild("container", { static: true })
  private container: ElementRef;

  @HostListener("keydown.escape", ["$event"])
  onKeydownHandler(event: KeyboardEvent) {
    if (this.closable) this.onCloseClick();
  }

  private comRef: ComponentRef<any>;
  private isActivated: boolean = false;

  constructor(
    private resolver: ComponentFactoryResolver,
    private element: ElementRef,
    private zone: NgZone
  ) {}

  ngOnInit(): void {
    const factory = this.resolver.resolveComponentFactory(this.content);
    this.comRef = this.popupBody.createComponent(factory);
    let com = this.comRef.instance as any;
    //Object.assign(com, this.data);
    if (com.closeEvent) {
      com.closeEvent.subscribe((e: ClosingEventArgs) => {
        this.close.emit(e);
      });
    }
    this.content = com;
    Object.assign(this.content, this.data);
    //
    if (com.onReceiveData && this.data) {
      com.onReceiveData(this.data);
    }
  }

  ngAfterViewInit() {
    this.focus();
    this.resizeBody();
  }

  close: EventEmitter<ClosingEventArgs> = new EventEmitter<ClosingEventArgs>();

  width: number = 100;

  data: any = {};

  maximizable: boolean = false;

  closable: boolean = true;

  content: any;
  onCloseClick() {
    this.close.emit({ cancel: false });
  }

  title: string;

  ngOnDestroy() {
    if (this.comRef) this.comRef.destroy();
  }

  focus() {
    setTimeout(() => this.container.nativeElement.focus());
  }

  active() {
    this.isActivated = true;
  }

  deactive() {
    this.isActivated = false;
  }
  onFullScreen() {}

  resizeBody() {
    //this.zone.runOutsideAngular(() => {
    //TODO
    // this.popupBody.element.nativeElement;
    // let toolbar = this.element.nativeElement.querySelector(".ax-page-toolbar");
    // let pageContent = this.element.nativeElement.querySelector(
    //   ".ax-page-content"
    // );
    // let popupContent = this.element.nativeElement.querySelector(
    //   ".page-content-wrap"
    // );
    // if (toolbar) {
    //   if (popupContent)
    //     popupContent.style.height =
    //       pageContent.scrollHeight + toolbar.scrollHeight + "px";
    //   if (pageContent)
    //     pageContent.style.top = toolbar.scrollHeight + "px";
    // } else {
    //   if (popupContent && pageContent)
    //     popupContent.style.height = pageContent.scrollHeight + "px";
    // }
    //});
  }
}
