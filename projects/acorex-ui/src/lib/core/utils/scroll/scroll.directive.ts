import { Directive } from "@angular/core";
import { ElementRef } from "@angular/core";

@Directive({
  selector: "[horizontalScroll]"
})
export class AXHorizontalScrollDirective {
  constructor(private el: ElementRef<HTMLElement>) {}
  ngAfterViewInit(): void {
    debugger;
    this.el.nativeElement.addEventListener(
      "wheel",
      this.onMouseWheel.bind(this)
    );
  }
  onMouseWheel(e) {
    let delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
    this.el.nativeElement.scrollLeft -= delta * 40;
  }
}
