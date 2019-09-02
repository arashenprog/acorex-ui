import { Component, ElementRef } from "@angular/core";

@Component({
  selector: "ax-page",

  template: `
    <div class="page-content-wrap">
      <div class="ax-page-side-start">
        <ng-content select="ax-page-side-start"></ng-content>
      </div>
      <div class="ax-page-toolbar">
        <ng-content select="ax-toolbar"></ng-content>
      </div>
      <ng-content select="ax-page-content"></ng-content>
      <ng-content select="ax-page-footer"></ng-content>
      <div class="ax-page-side-end">
        <ng-content select="ax-page-side-end"></ng-content>
      </div>
    </div>
  `
})
export class AXPageComponent {
  constructor(private el: ElementRef<HTMLElement>) {}
  ngAfterViewInit(): void {
    // //debugger;
    // let contentWrap = this.el.nativeElement.querySelector(
    //   ".page-content-wrap"
    // ) as HTMLElement;
    // let toolbar = this.el.nativeElement.querySelector(
    //   ".ax-page-toolbar"
    // ) as HTMLElement;
    // let content = this.el.nativeElement.querySelector(
    //   ".ax-page-content"
    // ) as HTMLElement;
    // content.style.height = content.clientHeight - toolbar.clientHeight + "px";
  }
}
