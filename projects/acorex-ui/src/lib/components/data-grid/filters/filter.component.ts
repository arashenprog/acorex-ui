import { Component, OnInit } from "@angular/core";

import { ViewEncapsulation } from "@angular/core";

@Component({
  selector: "ax-data-grid-filter",
  template: `
    <div class="ax-grid-filter-container">
      <ng-content></ng-content>
      <div class="btn-group" role="group">
        <button type="button" class="btn btn-light btn-sm">
          <i class="fas fa-filter text-primary"></i>
        </button>
        <button type="button" class="btn btn-light btn-sm">
          <i class="fas fa-trash-alt text-danger"></i>
        </button>
      </div>
    </div>
  `,
  styleUrls: ["./filter.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class AXDataGridFilterComponent {}
