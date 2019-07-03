import { Component, Input } from "@angular/core";
import { ElementRef } from "@angular/core";

export type AXPlacement =
  | "top-start"
  | "top-middle"
  | "top-end"
  | "center-start"
  | "center-end"
  | "bottom-start"
  | "bottom-middle"
  | "bottom-end"

export class AXPoint {

  constructor(public x: number, public y: number) {

  }
}

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

    let targetPos: AXPoint = this.getTargetPosition(target);
    //let popPos: AXPoint = this.getTargetPosition(pop);
    //
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


  getTargetPosition(el: HTMLElement): AXPoint {
    let rec = el.getBoundingClientRect();
    let width = el.offsetWidth;
    let height = el.offsetHeight;
    switch (this.placement) {
      case "top-start":
        return new AXPoint(rec.left, rec.top);
      case "top-middle":
        return new AXPoint(rec.left + (width / 2), rec.top);
      case "top-end":
        return new AXPoint(rec.left + (width), rec.top);
      case "center-end":
        return new AXPoint(rec.left + (width), rec.top + (height / 2));
      case "bottom-end":
        return new AXPoint(rec.left + (width), rec.top + (height));
      case "bottom-middle":
        return new AXPoint(rec.left + (width / 2), rec.top + (height));
      case "bottom-start":
        return new AXPoint(rec.left, rec.top + (height));
      case "center-start":
        return new AXPoint(rec.left, rec.top + (height / 2));
      default:
        return new AXPoint(rec.left + (width / 2), rec.top + (height));
    }
  }

}
