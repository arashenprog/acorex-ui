import { Directive, HostListener, Input } from "@angular/core";
import { ElementRef } from "@angular/core";

@Directive({
  selector: "[horizontalScroll]"
})
export class AXHorizontalScrollDirective {
  constructor(private el: ElementRef<HTMLElement>) {}

  @Input("horizontalScroll")
  scrollValue: number = 40;

  @HostListener("wheel", ["$event"])
  onMouseWheel(e) {
    let delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
    this.el.nativeElement.scrollLeft -= delta * this.scrollValue;
  }
}
