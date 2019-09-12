import { Component, ContentChildren, QueryList, Input } from "@angular/core";
import { AXValidationRule } from "./validation-rule.widget";
import { IValidationRuleResult } from "./validation.classs";

@Component({
  selector: "ax-validation",
  template: "<ng-content></ng-content>"
})
export class AXValidationComponent {
  @ContentChildren(AXValidationRule) items: QueryList<AXValidationRule>;

  @Input()
  validateOn: "blur" | "change" | 'submit' = null;

  validate(value: any): Promise<IValidationRuleResult> {
    return new Promise<IValidationRuleResult>(resolve => {
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
