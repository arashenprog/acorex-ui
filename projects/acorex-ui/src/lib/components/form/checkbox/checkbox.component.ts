import {
  Component,
  ViewEncapsulation,
  Output,
  EventEmitter,
  Input
} from "@angular/core";
import { AXCheckedBaseComponent } from "../../../core/base.class";

@Component({
  selector: "ax-check-box",
  templateUrl: "./checkbox.component.html",
  styleUrls: ["./checkbox.component.scss"],
})
export class AXCheckBoxComponent extends AXCheckedBaseComponent {
  @Input() checked : boolean = false;

  onClick() {
    if (this.readOnly) {
      return false;
    } else {
      this.value = !this.value;
    }
  }

}
