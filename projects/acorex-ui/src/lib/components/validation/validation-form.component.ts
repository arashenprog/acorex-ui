import {
  Component,
  OnInit,
  QueryList,
  ViewChildren,
  ContentChildren
} from "@angular/core";
import {} from "../../core/base.class";
import { AXTextBoxComponent } from "../text-box/text-box.component";

@Component({
  selector: "ax-validation-form",
  template: "<ng-content></ng-content>"
})
export class AXValidationFormComponent implements OnInit {
  constructor() {}

  @ContentChildren(AXTextBoxComponent, { descendants: true })
  widgets: QueryList<AXTextBoxComponent>;

  ngOnInit(): void {}

  validate(): boolean {
    let valid: boolean = true;
    this.widgets.forEach(w => {
      (<any>w).validate();
    });
    return valid;
  }
}
