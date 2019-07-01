import { Component, Input } from "@angular/core";
import { ElementRef } from "@angular/core";

@Component({
  selector: "ax-popover",
  templateUrl: "./popover.component.html",
  styleUrls: ["./popover.component.scss"]
})
export class AXPopoverComponent {
  constructor(private el: ElementRef<HTMLElement>) {}
  @Input("target") target: string;
  @Input("position") position:
    | "end"
    | "end-top"
    | "end-bottom"
    | "start"
    | "start-top"
    | "start-bottom"
    | "top"
    | "top-start"
    | "top-end"
    | "bottom"
    | "bottom-start"
    | "bottom-end" = "start";

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
    debugger;
    let pop = <HTMLElement>(
      this.el.nativeElement.querySelector(".popover-container")
    );
    let target = <HTMLElement>document.querySelector(this.target);
    let tp = target.getBoundingClientRect();
    let pp = pop.getBoundingClientRect();
    let distance = this.distance;

    switch (this.position) {
      case "top-start":
        debugger;
        pop.style.top = tp.top - pop.clientHeight + distance + "px";
        pop.style.left = tp.left + distance + "px";
        break;
      case "top-end":
        pop.style.top = tp.top - pop.clientHeight + distance + "px";
        pop.style.left = tp.left + target.clientWidth + distance + "px";
        break;
      case "top":
        pop.style.top = tp.top - pop.clientHeight + distance + "px";
        pop.style.left = tp.left - pp.width / 3 + "px";

      case "bottom-start":
        pop.style.top = tp.top + tp.height + distance + "px";
        pop.style.left = tp.left + distance + "px";
        break;
      case "bottom-end":
        pop.style.top = tp.top + tp.height + distance + "px";
        pop.style.left = tp.left + tp.width + distance + "px";
        break;
      case "bottom":
        pop.style.top = tp.top + tp.height + distance + "px";
        pop.style.left = tp.left - pp.width / 3 + "px";
        break;
      case "start-top":
        pop.style.top = tp.top + distance + "px";
        pop.style.left = tp.left - pp.width + "px";
        break;
      case "start-bottom":
        pop.style.top = tp.top + tp.height + distance + "px";
        pop.style.left = tp.left - pp.width + "px";
        break;
      case "start":
        pop.style.top = tp.top + tp.height + distance + "px";
        pop.style.left = tp.left - pp.width + "px";
        break;

      default:
        break;
    }
  }
}
