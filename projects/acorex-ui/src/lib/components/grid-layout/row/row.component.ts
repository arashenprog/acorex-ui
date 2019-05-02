import { Component, Input, ElementRef } from "@angular/core";
@Component({
  selector: "ax-row",
  template:
    '<div [style.height]=[height] style="display:flex;flex-wrap: wrap;margin-bottom:10px"><ng-content></ng-content></div>'
})
export class AXRowComponent {
  @Input()
  size: number;
  @Input()
  height: string;

  setHeight() {
    if (this.size) {
      let contentWrapper = this.element.nativeElement.closest(".inner-content");
      console.log(this.size * contentWrapper.clientHeight + "px");
      this.height = this.size * contentWrapper.clientHeight - 25 + "px";
    } else {
      this.height = "auto";
    }
  }

  constructor(private element: ElementRef) {}

  ngAfterViewInit() {
    this.setHeight();
  }
}
