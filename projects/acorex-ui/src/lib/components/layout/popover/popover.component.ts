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
    this.zone.runOutsideAngular(() => {
      window.document.addEventListener("click", this.clickOutListener.bind(this));
      window.document.addEventListener("scroll", this.onScollListener.bind(this));
    });
  }

  @Input("target") target: string;
  @Input("placement") placement: AXPlacement = "bottom-middle";
  @Input("alignment") alignment: AXPlacement = "top-middle";
  @Input("width") width: number;
  @Input("height") height: number;
  @Input("fitParent") fitParent: boolean = false;

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
    this.visible = true;
  }

  setPosition() {
    let pop = this.el.nativeElement.querySelector<HTMLElement>(
      ".popover-container"
    );
    let target = document.querySelector<HTMLElement>(this.target);
    if (!target || !pop)
      return;
    let targetPos: AXPoint = AXHtmlUtil.getBoundingRectPoint(target, this.placement);
    //
    pop.style.width = this.width + "px";
    pop.style.height = this.height + "px";

    if (this.fitParent === true) {
      pop.style.minWidth = target.getBoundingClientRect().width + "px"
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

  ngOnDestroy(): void {
    this.zone.runOutsideAngular(() => {
      window.document.removeEventListener("click", this.clickOutListener.bind(this));
      window.document.removeEventListener("scroll", this.onScollListener.bind(this));
    });
  }

  private onScollListener(event: UIEvent) {
    console.log("scroll", event);
    this.close();
  }

  private clickOutListener(event: MouseEvent) {
    debugger;
    let target = document.querySelector<HTMLElement>(this.target);
    let pop = this.el.nativeElement.querySelector('.popover-container');
    if (target && pop) {
      let targetBound = target.getBoundingClientRect();
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
  }
}
