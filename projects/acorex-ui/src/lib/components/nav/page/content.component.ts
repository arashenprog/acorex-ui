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

 

  
}
