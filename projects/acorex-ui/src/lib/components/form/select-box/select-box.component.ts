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
  styleUrls: ["./select-box.component.scss"]
})
export class AXSelectBoxComponent extends AXSelectBaseComponent {
  @ViewChild(NgSelectComponent) ngSelect: NgSelectComponent;

  constructor() {
    super();
  }

  @Input() items: SelectItem[] = [];
  @Input() searchable: boolean = false;
  @Input() label: string;
  onClickInner() {
    if (this.ngSelect.isOpen) {
      this.ngSelect.close();
    } else {
      this.ngSelect.open();
    }
  }
}
