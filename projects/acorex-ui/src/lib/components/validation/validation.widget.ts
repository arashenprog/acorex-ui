import { IValidationWidget } from "../../core/base.class";

export class ValidationWidget implements IValidationWidget {
  validate(): boolean {
    return true;
  }
}
