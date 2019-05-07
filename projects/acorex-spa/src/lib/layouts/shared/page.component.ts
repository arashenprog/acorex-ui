import {
    Component
  } from "@angular/core";
  
  @Component({
    selector: "page",
    template: `
    <div class="page-content-wrap">
      <div>
        <ng-content select="toolbar"> </ng-content>
      </div>
      <div>
        <ng-content select="content"> </ng-content>
      </div>
      <div>
        <ng-content select="footer"> </ng-content>
      </div>
    </div>`
  })
  export class AXPageComponent {
    constructor() {}
  }