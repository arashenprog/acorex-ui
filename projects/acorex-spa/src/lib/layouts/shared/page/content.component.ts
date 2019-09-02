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
  constructor(private el: ElementRef) { }

  ngAfterViewInit(): void {
    debugger;
    setTimeout(() => {
      this.applyResize();
    }, 500);
  }

  private applyResize() {
    let page = this.closest(this.el.nativeElement, ".page-content-wrap");
    if (page) {
      let pageHeight = 0;
      let footer = page.querySelector(".ax-page-footer");
      if (footer) {
        pageHeight += footer.clientHeight;
      }
      let toolbar = page.querySelector(".ax-page-toolbar");
      if (toolbar) {
        pageHeight += toolbar.clientHeight;
      }
      this.el.nativeElement.querySelector(
        ".ax-page-content"
      ).style.height = `calc(100% - ${pageHeight}px)`;
      //
      //window.dispatchEvent(new Event('resize'));
    }
  }

  private closest(el, selector) {
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
