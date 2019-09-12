import { Component, Input } from "@angular/core";
@Component({
  selector: "ax-container",
  template: `
  <div class="container-fluid">
      <ng-content></ng-content>
  </div>
  `
})
export class AXContainerComponent {
  
  constructor() {}
}
