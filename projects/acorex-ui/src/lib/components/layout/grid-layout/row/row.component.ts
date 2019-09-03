import { Component, Input, ElementRef } from "@angular/core";
@Component({
  selector: "ax-row",
  template:
    '<div [style.height]=[height] class="row gutter"><ng-content></ng-content></div>'
})
export class AXRowComponent {
  @Input()
  size: number;
  @Input()
  height: string;

  setHeight() {
    if (this.size) {
      let contentWrapper = this.element.nativeElement.closest(".inner-content");
      this.height = this.size * contentWrapper.clientHeight - 25 + "px";
    } else {
      this.height = "auto";
    }
  }

  constructor(private element: ElementRef) {}

  ngAfterViewInit() {
    setTimeout(_ => this.setHeight());
  }
}
