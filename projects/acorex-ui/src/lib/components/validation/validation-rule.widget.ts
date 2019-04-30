import { Component, Input } from "@angular/core";
import { IValidationRuleResult } from "./validation.classs";

@Component({
  selector: "ax-validation-rule",
  template: ""
})
export class AXValidationRule {
  @Input()
  type: "required" | "email" | "regex" | "phone" | "callback" = "required";
  @Input()
  message: string;
  @Input()
  value: any;

  validate(value: any): Promise<IValidationRuleResult> {
    return new Promise<IValidationRuleResult>(resolve => {
      switch (this.type) {
        case "required":
          resolve({ message: this.message, result: value != null && value != "" });
          break;
        case "email":
          const regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          resolve({ message: this.message, result: regEmail.test(value) });
          break;
        case "phone":
          const regPhone = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/
          resolve({ message: this.message, result: regPhone.test(value) });
          break
        case "regex":
          resolve({
            message: this.message,
            result: (<RegExp>this.value).test(value)
          });
          break;
        case "callback":
          resolve(this.value(value));
          break;
        default:
          resolve({ result: true });
      }
    });
  }
}
