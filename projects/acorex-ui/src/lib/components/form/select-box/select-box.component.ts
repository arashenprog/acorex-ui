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

@Component({
  selector: "ax-select-box",
  templateUrl: "./select-box.component.html",
  styleUrls: ["./select-box.component.scss"]
})
export class AXSelectBoxComponent extends AXSelectBaseComponent {

  constructor() {
    super();
  }

  @Input() items: SelectItem[] = [];
  @Input() searchable: boolean = false;
  @Input() label: string;

}
