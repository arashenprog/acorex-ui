import {
    Component
  } from "@angular/core";
  
  @Component({
    selector: "ax-page-footer",
    template:
      `<div class="ax-page-footer" >
          <ng-content></ng-content>
       </div>`
  })
  export class AXPageFooterComponent {}