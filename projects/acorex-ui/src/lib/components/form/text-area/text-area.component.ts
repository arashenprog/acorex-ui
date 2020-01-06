import { Component, Input, ViewEncapsulation } from "@angular/core";
import {
  AXTextInputBaseComponent,
  AXValidatableComponent
} from "../../../core/base.class";
@Component({
  selector: "ax-text-area",
  templateUrl: "./text-area.component.html",
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: AXValidatableComponent, useExisting: AXTextAreaComponent }
  ]
})
export class AXTextAreaComponent extends AXTextInputBaseComponent {
 
  @Input()
  rows:number=3;

}
