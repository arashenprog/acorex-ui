import { Component, ViewEncapsulation, Input } from "@angular/core";
import { AXLoadingBaseComponent } from "../../../core/base.class";

@Component({
  selector: "ax-loading",
  templateUrl: "./loading.component.html",
  encapsulation: ViewEncapsulation.None
})
export class AXLoadingComponent extends AXLoadingBaseComponent {
}
