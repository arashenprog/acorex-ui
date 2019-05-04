import {
    Component
  } from "@angular/core";
  
  @Component({
    selector: "content",
    template:
      `<div class="ax-page-content" id="pageContent">
            <div class="inner-content" id="innerContent">
                <ng-content></ng-content>
            </div>
       </div>`
  })
  export class AXPageContentComponent {}