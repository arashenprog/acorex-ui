import { Component, Input } from "@angular/core";
import { IValidationResult } from "./validation.classs";

@Component({
  selector: "ax-validation",
  template: ""
})
export class AXValidation {
  @Input()
  type: "required" | "email" | "regex" = "required";
  @Input()
  message: string;
  @Input()
  value: any;

  validate(value: string): Promise<IValidationResult> {
    return new Promise<IValidationResult>(resolve => {
      switch (this.type) {
        case "required":
          resolve({ message: this.message, result: value != null });
          break;
        case "email":
          const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          resolve({ message: this.message, result: reg.test(value) });
          break;
        case "regex":
          resolve({
            message: this.message,
            result: (<RegExp>this.value).test(value)
          });
          break;
        default:
          resolve({ result: true });
      }
    });
  }
}
