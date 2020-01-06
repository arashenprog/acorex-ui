import { Component, ElementRef } from "@angular/core";

@Component({
  selector: "ax-page",

  template: `
    <div class="page-content-wrap">
      <div class="ax-page-toolbar">
        <ng-content select="ax-toolbar"></ng-content>
      </div>
      <ng-content select="ax-page-content"></ng-content>
      <ng-content select="ax-page-footer"></ng-content>
    
    </div>
  `
})
export class AXPageComponent {
  constructor(private el: ElementRef<HTMLElement>) { }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.applyResize();
    }, 500);
  }


  private applyResize() {
    let page = this.el.nativeElement.querySelector<HTMLDivElement>(".page-content-wrap");

    if (page) {
      let popup = this.closest(page, '.popup-body');
      if (page.clientHeight <= 100) {
        page.style.height = "100vh";
      }

      let pageContentHeight = 0;
      let footer = page.querySelector<HTMLDivElement>(".ax-page-footer");
      if (footer) {
        pageContentHeight += footer.clientHeight;
      }
      let toolbar = page.querySelector<HTMLDivElement>(".ax-page-toolbar");
      if (toolbar) {
        pageContentHeight += toolbar.clientHeight;
      }
      this.el.nativeElement.querySelector<HTMLDivElement>(
        ".ax-page-content"
      ).style.height = popup ? `${popup.getBoundingClientRect().height - pageContentHeight - 5}px` : `calc(100% - ${pageContentHeight}px)`;
      //
      //window.dispatchEvent(new Event('resize'));
    }
  }

  private closest(el, selector): HTMLElement {
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
