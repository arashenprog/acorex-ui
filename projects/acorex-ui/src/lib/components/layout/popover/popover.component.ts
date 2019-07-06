import { Component, Input } from "@angular/core";
import { ElementRef } from "@angular/core";
import { AXPlacement, AXHtmlUtil, AXPoint } from "../../../core/utils/html/html-util.class";



@Component({
  selector: "ax-popover",
  templateUrl: "./popover.component.html",
  styleUrls: ["./popover.component.scss"]
})
export class AXPopoverComponent {
  constructor(private el: ElementRef<HTMLElement>) { }
  @Input("target") target: string;
  @Input("placement") placement: AXPlacement = "bottom-middle";
  @Input("alignment") alignment: AXPlacement = "top-middle";

  @Input() distance: number = 0;
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
  }

  toggle() {
    this.visible = !this.visible;
  }

  setPosition() {

    let pop = this.el.nativeElement.querySelector<HTMLElement>(".popover-container");
    let target = document.querySelector<HTMLElement>(this.target);

    let targetPos: AXPoint = AXHtmlUtil.getBoundingRectPoint(target, this.placement);
    //
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
        top = targetPos.y - (pop.offsetHeight / 2);
        left = targetPos.x - pop.offsetWidth;
        break;
      case "bottom-end":
        top = targetPos.y - (pop.offsetHeight);
        left = targetPos.x - pop.offsetWidth;
        break;
      case "bottom-middle":
        top = targetPos.y - (pop.offsetHeight);
        left = targetPos.x - (pop.offsetWidth / 2);
        break;
      case "bottom-start":
        top = targetPos.y - (pop.offsetHeight);
        left = targetPos.x;
        break;
      case "center-start":
        top = targetPos.y - (pop.offsetHeight / 2);
        left = targetPos.x;
        break;

    }
    pop.style.top = top + "px";
    pop.style.left = left + "px";
  }
}
