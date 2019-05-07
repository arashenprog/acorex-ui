import {
  Component,
  OnInit,
  QueryList,
  ContentChildren
} from "@angular/core";
import { IValidationResult } from './validation.classs';
import { AXValidatableComponent } from '../../../core/base.class';

@Component({
  selector: "ax-validation-form",
  template: "<ng-content></ng-content>"
})
export class AXValidationFormComponent implements OnInit {
  constructor() { }

  @ContentChildren(AXValidatableComponent, { descendants: true })
  widgets: QueryList<AXValidatableComponent>;

  ngOnInit(): void { }

  validate(): Promise<IValidationResult> {
    return new Promise<IValidationResult>(resolve => {
      Promise.all(this.widgets.map(c => { return (<any>c).validate(); })).then(rules => {
        const failed = rules.filter(c => !c.result);
        if (failed.length) {
          resolve({
            result: false,
            items: failed
          });
        }
        else {
          resolve({ result: true });
        }
      });
    });
  }
}
