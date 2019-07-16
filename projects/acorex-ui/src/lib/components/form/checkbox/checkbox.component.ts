import {
  Component,
  ViewEncapsulation,
  Output,
  EventEmitter
} from "@angular/core";
import { AXCheckedBaseComponent } from "../../../core/base.class";

@Component({
  selector: "ax-check-box",
  templateUrl: "./checkbox.component.html",
  styleUrls: ["./checkbox.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class AXCheckBoxComponent extends AXCheckedBaseComponent {
  onClick(e) {
    if (this.readOnly) {
      return false;
    } else {
      this.value = !this.value;
    }
  }
}
