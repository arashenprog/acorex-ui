import { PromisResult } from "../../core/base.class";
import { Component, ContentChildren, QueryList } from "@angular/core";
import { AXValidation } from "./validation.widget";
import { IValidationResult } from "./validation.classs";

@Component({
  selector: "ax-validations",
  template: "<ng-content></ng-content>"
})
export class AXValidations {
  @ContentChildren(AXValidation) items: QueryList<AXValidation>;

  validate(value: any): Promise<IValidationResult> {
    return new Promise<IValidationResult>(resolve => {
      Promise.all(
        this.items.map(c => {
          return c.validate(value);
        })
      ).then(d => {
        let error = d.find(c => c.result == false);
        if (error) resolve(error);
        else resolve({ result: true });
      });
    });
  }
}
