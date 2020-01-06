import { Component, Input, NgZone, ChangeDetectorRef, ChangeDetectionStrategy } from "@angular/core";
import { ElementRef } from "@angular/core";
import { AXPlacement, AXHtmlUtil, AXPoint } from "../../../core/utils/html/html-util";



@Component({
  selector: "ax-popover",
  templateUrl: "./popover.component.html",
  styleUrls: ["./popover.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXPopoverComponent {


  constructor(
    private el: ElementRef<HTMLElement>,
    private zone: NgZone,
    private cdr: ChangeDetectorRef
  ) {

  }

  private targetEl: HTMLElement;

  @Input("target") target: string;
  @Input("placement") placement: AXPlacement = "bottom-middle";
  @Input("alignment") alignment: AXPlacement = "top-middle";
  @Input("fitParent") fitParent: boolean = false;
  @Input("openMode") openMode: "manual" | "click" | "hover" = "manual";
  @Input("closeMode") closeMode: "manual" | "clickout" | "mouseout" = "clickout";

  @Input("height") height: string = "300px";
  @Input("width") width: string = "300px";

  @Input("maxHeight") maxHeight: string = "300px";
  @Input("maxWidth") maxWidth: string = "300px";




  @Input() distance: number = 5;
  private _visible: boolean;

  @Input()
  public get visible(): boolean {
    return this._visible;
  }
  public set visible(v: boolean) {
    this._visible = v;
    if (this._visible) {
      setTimeout(() => {
        this.setPosition();
      });
      this.addCloseRemoveOpenListeners();
    }
    else {
      this.addOpenRemoveCloseListener()
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

  setPosition() {
    let pop = this.el.nativeElement.querySelector<HTMLElement>(
      ".popover-container"
    );
    if (!this.targetEl || !pop)
      return;
    let targetPos: AXPoint = AXHtmlUtil.getBoundingRectPoint(this.targetEl, this.placement);
    //
    // pop.style.width = this.width + "px";
    // pop.style.height = this.height + "px";

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
    pop.style.top = top + "px";
    pop.style.left = left + "px";
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
      window.addEventListener("scroll", this.HandleScrollListener.bind(this));
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
    window.removeEventListener("scroll", this.HandleScrollListener.bind(this));
  }


  private handleMouseOver(e: MouseEvent) {
    this.open();
  }

  private HandleScrollListener(e: UIEvent) {
    this.close();
  }


  private clickOutListener(event: MouseEvent) {
    if (this.visible) {
      this.zone.runOutsideAngular(() => {
        let pop = this.el.nativeElement.querySelector('.popover-container');
        if (this.targetEl && pop) {
          let targetBound = this.targetEl.getBoundingClientRect();
          let elBound = pop.getBoundingClientRect();
          let pos = { x: event.clientX, y: event.clientY };
          let inTarget = AXHtmlUtil.isInRecPoint(pos, {
            left: targetBound.left,
            width: targetBound.width,
            top: targetBound.top,
            height: targetBound.height
          });
          let inEl = AXHtmlUtil.isInRecPoint(pos, {
            left: elBound.left,
            width: elBound.width,
            top: elBound.top,
            height: elBound.height
          });
          if (inTarget || inEl)
            return;

          this.close();
        }
      });
    }
  }


}
