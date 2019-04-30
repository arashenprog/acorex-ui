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
  OnDestroy
} from "@angular/core";
import { ClosingEventArgs } from "./popup.service";

@Component({
  selector: "ax-popup",
  templateUrl: "./popup.component.html",
  encapsulation: ViewEncapsulation.None
})
export class AXPopupComponent implements OnInit, OnDestroy {
  @ViewChild("popupBody", { read: ViewContainerRef })
  private popupBody: ViewContainerRef;
  @ViewChild("container")
  private container: ElementRef;

  @HostListener("keydown.escape", ["$event"])
  onKeydownHandler(event: KeyboardEvent) {
    if (this.closable) this.onCloseClick();
  }

  private comRef: ComponentRef<any>;
  private isActivated: boolean = false;

  ngOnInit(): void {
    const factory = this.resolver.resolveComponentFactory(this.content);
    this.comRef = this.popupBody.createComponent(factory);
    let com = this.comRef.instance as any;
    Object.assign(com, this.data);
    if (com.closeEvent) {
      com.closeEvent.subscribe((e: ClosingEventArgs) => {
        this.close.emit(e);
      });
    }
    this.content = com;
    //
  }

  ngAfterViewInit() {
    this.focus();
  }

  close: EventEmitter<ClosingEventArgs> = new EventEmitter<ClosingEventArgs>();
  constructor(private resolver: ComponentFactoryResolver) {}

  @Input()
  width: number = 100;

  @Input()
  data: any = {};

  @Input()
  maximizable: boolean = false;

  @Input()
  closable: boolean = true;

  @Input()
  content: any;
  onCloseClick() {
    this.close.emit({ cancel: false });
  }

  @Input()
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
}
