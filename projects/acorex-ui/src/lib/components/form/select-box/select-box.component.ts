import {
  Component,
  Input,
  EventEmitter,
  Output,
  ViewEncapsulation,
  ViewChild
} from "@angular/core";
import { SelectItem } from "../../../core/select.class";
import { AXSelectBaseComponent } from "../../../core/base.class";
import { NgSelectComponent } from "@ng-select/ng-select";

@Component({
  selector: "ax-select-box",
  templateUrl: "./select-box.component.html",
  styleUrls: ["./select-box.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class AXSelectBoxComponent extends AXSelectBaseComponent {
  @ViewChild(NgSelectComponent) ngSelect: NgSelectComponent;

  constructor() {
    super();
  }
  validate(): Promise<
    import("../validation/validation.classs").IValidationRuleResult
  > {
    throw new Error("Method not implemented.");
  }
  @Input() items: any[] = [];
  onClickInner() {

    if (this.ngSelect.isOpen){ this.ngSelect.close();}
    else {this.ngSelect.open();}

  }
}
