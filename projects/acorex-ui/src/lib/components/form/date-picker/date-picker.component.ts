import { Component, Injector } from "@angular/core";

import { AXValidatableComponent } from '../../../core/base.class';
import { AXDatePicker, AXIDatePicker } from "./data-picker-base.component";



@Component({
  selector: "ax-date-picker",
  template: `
    <ax-date-picker-persian></ax-date-picker-persian>
  `,
  providers: [
    { provide: AXValidatableComponent, useExisting: AXDatePickerComponent },
  ]
})
export class AXDatePickerComponent extends AXDatePicker implements AXIDatePicker {

  constructor(injector: Injector) {
    super(injector);
  }

}
