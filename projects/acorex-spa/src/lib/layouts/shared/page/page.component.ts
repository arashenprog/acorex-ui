import {
  Component
} from "@angular/core";

@Component({
  selector: "ax-page",
  template: `
    <div class="page-content-wrap">
        <ng-content select="ax-page-toolbar"> </ng-content>
        <ng-content select="ax-page-content"> </ng-content>
        <ng-content select="ax-page-footer"> </ng-content>
    </div>`
})
export class AXPageComponent {
  constructor() { }
}