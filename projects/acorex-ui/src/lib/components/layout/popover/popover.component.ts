import { Component, Input, NgZone, ChangeDetectorRef, ChangeDetectionStrategy, ViewEncapsulation, EventEmitter, Output } from "@angular/core";
import { ElementRef } from "@angular/core";
import { AXPlacement, AXHtmlUtil, AXPoint, AXIPoint } from "../../../core/utils/html/html-util";
import {
  trigger,
  state,
  style,
  animate,
  transition
} from "@angular/animations";



@Component({
  selector: "ax-popover",
  templateUrl: "./popover.component.html",
  styleUrls: ["./popover.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger("visibilityChanged", [
      state(
        "shown",
        style({
          opacity: 1
        })
      ),
      state(
        "hidden",
        style({
          opacity: 0,
        })
      ),
      transition("Void => *", animate("0ms")),
      transition("shown => hidden", animate("50ms")),
      transition("hidden => shown", animate("150ms")),
    ])
  ]
})
export class AXPopoverComponent {


  constructor(
    private el: ElementRef<HTMLElement>,
    private zone: NgZone,
    private cdr: ChangeDetectorRef
  ) {

  }

  private targetEl: HTMLElement;

  private mousePos: AXIPoint;

  @Input("target") target: string;
  @Input("placement") placement: AXPlacement = "bottom-middle";
  @Input("alignment") alignment: AXPlacement = "top-middle";
  @Input("fitParent") fitParent: boolean = false;
  @Input("openMode") openMode: "manual" | "click" | "hover" = "manual";
  @Input("closeMode") closeMode: "manual" | "clickout" | "mouseout" = "clickout";


  @Output()
  onOpen:EventEmitter<void>=new EventEmitter<void>();

  @Output()
  onClose:EventEmitter<void>=new EventEmitter<void>();

  @Input() distance: number = 5;



  private _visible: boolean = false;


  @Input()
  public get visible(): boolean {
    return this._visible;
  }
  public set visible(v: boolean) {
    this._visible = v;
    if (this._visible) {
      this.addCloseRemoveOpenListeners();
      this.onOpen.emit();
    }
    else {
      this.addOpenRemoveCloseListener()
      this.onClose.emit();
    }
    this.cdr.markForCheck();
  }

  toggle() {
    this.visible = !this.visible;
  }

  close() {
    this.zone.run(() => {
      this.visible = false;
    })
  }

  open() {
    this.zone.run(() => {
      this.visible = true;
    })
  }

  private setPosition() {
    this.zone.runOutsideAngular(() => {
      let pop = this.el.nativeElement.querySelector<HTMLElement>(
        ".ax-popover-container"
      );
      if (!this.targetEl || !pop)
        return;
      let targetPos: AXPoint = AXHtmlUtil.getBoundingRectPoint(this.targetEl, this.placement);
      //
      if (this.fitParent === true) {
        pop.style.minWidth = this.targetEl.getBoundingClientRect().width + "px"
      }

      let top: number = 0;
      let left: number = 0;
      switch (this.alignment) {
        case "top-start":
          top = targetPos.y;
          left = targetPos.x;
          break;
        case "top-middle":
          top = targetPos.y;
          left = targetPos.x - pop.offsetWidth / 2;
          break;
        case "top-end":
          top = targetPos.y;
          left = targetPos.x - pop.offsetWidth;
          break;
        case "center-end":
          top = targetPos.y - pop.offsetHeight / 2;
          left = targetPos.x - pop.offsetWidth;
          break;
        case "bottom-end":
          top = targetPos.y - pop.offsetHeight;
          left = targetPos.x - pop.offsetWidth;
          break;
        case "bottom-middle":
          top = targetPos.y - pop.offsetHeight;
          left = targetPos.x - pop.offsetWidth / 2;
          break;
        case "bottom-start":
          top = targetPos.y - pop.offsetHeight;
          left = targetPos.x;
          break;
        case "center-start":
          top = targetPos.y - pop.offsetHeight / 2;
          left = targetPos.x;
          break;
      }
      if (top + pop.offsetHeight > window.innerHeight) {
        top = window.innerHeight - pop.offsetHeight - 10;
      }
      pop.style.top = top + "px";
      if (left < 0) {
        left = 0;
      }
      if (left + pop.offsetWidth > window.innerWidth) {
        left = (window.innerWidth - pop.offsetWidth) - 10;
      }
      pop.style.left = left + "px";
    });
  }

  ngAfterViewInit(): void {
    this.targetEl = document.querySelector<HTMLElement>(this.target);
    this.addOpenRemoveCloseListener();
  }

  ngOnDestroy(): void {
    this.removeOpenListeners();
    this.removeCloseListeners();
  }


  private addCloseRemoveOpenListeners() {
    this.zone.runOutsideAngular(() => {
      document.addEventListener("scroll", this.clickOutListener.bind(this), true);
      //add close listeners
      if (this.closeMode == "clickout") {
        window.document.addEventListener("click", this.clickOutListener.bind(this));
      }
      //
      if (this.closeMode == "mouseout") {
        window.document.addEventListener("mousemove", this.clickOutListener.bind(this));
      }
      //
      //remove open listeners
      this.removeOpenListeners();
    });
  }


  private addOpenRemoveCloseListener() {
    this.zone.runOutsideAngular(() => {
      //add open listeners
      if (this.openMode == "hover" && this.targetEl) {
        this.targetEl.addEventListener("mouseover", this.handleMouseOver.bind(this));
      }

      //
      if (this.openMode == "click") {
        let target = document.querySelector<HTMLElement>(this.target);
        if (target)
          target.addEventListener("click", this.open.bind(this));
      }
      //remove close listeners
      this.removeCloseListeners();
    });
  }

  private removeOpenListeners() {
    if (this.targetEl) {
      this.targetEl.removeEventListener("click", this.open.bind(this));
      window.document.removeEventListener("mouseover", this.handleMouseOver.bind(this));
    }
  }

  private removeCloseListeners() {
    window.document.removeEventListener("click", this.clickOutListener.bind(this));
    window.document.removeEventListener("mousemove", this.clickOutListener.bind(this));
    document.removeEventListener("scroll", this.clickOutListener.bind(this), true);
  }

  private handleMouseOver(e: MouseEvent) {
    this.open();
  }

  private clickOutListener(event: MouseEvent) {
    this.zone.runOutsideAngular(() => {
      if (this.visible) {
        let pop = this.el.nativeElement.querySelector<HTMLDivElement>('.ax-popover-container');
        if (this.targetEl && pop) {
          if (event.clientX != null)
            this.mousePos = { x: event.clientX, y: event.clientY };
          if (AXHtmlUtil.isInElementBound(this.mousePos, this.targetEl) || AXHtmlUtil.isInElementBound(this.mousePos, pop))
            return;
          this.close();
        }
      }
    });
  }

  handleAnimationStart(e) {
    e.element.style.display = "block";
    this.setPosition();
  }

  handleAnimationDone(e) {
    e.element.style.display = this.visible ? "block" : "none";
  }


}
