import { Component, ElementRef } from "@angular/core";

@Component({
  selector: "ax-page-content",
  template: `
    <div class="ax-page-content">
      <div class="inner-content">
        <ng-content></ng-content>
      </div>
    </div>
  `
})
export class AXPageContentComponent {
  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    let page = this.closest(this.el.nativeElement, ".page-content-wrap");
    if (page) {
      let pageHeight = 30;
      let footer = page.querySelector(".ax-page-footer");
      if (footer) {
        pageHeight += 50;
      }
      let toolbar = page.querySelector(".ax-toolbar");
      if (toolbar) {
        pageHeight += 50;
      }
      this.el.nativeElement.querySelector(
        ".ax-page-content"
      ).style.height = `calc(100vh - ${pageHeight}px)`;
    }
  }

  closest(el, selector) {
    var matches = el.webkitMatchesSelector
      ? "webkitMatchesSelector"
      : el.msMatchesSelector
      ? "msMatchesSelector"
      : "matches";

    while (el.parentElement) {
      if (el[matches](selector)) return el;

      el = el.parentElement;
    }

    return null;
  }
}
