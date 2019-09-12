import {
  Component,
  OnInit,
  QueryList,
  ContentChildren,
  Input
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

  @Input()
  validateOn: "blur" | "change" | 'submit' = 'submit';

  ngAfterViewInit(): void {
    this.widgets.forEach(w => {
      if (w.validator && w.validator.validateOn == null) {
        w.validator.validateOn = this.validateOn;
      }
    });

  }


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
