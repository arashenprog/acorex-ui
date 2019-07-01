import {
  Component,
  ElementRef,
  ViewChild,
  ViewContainerRef
} from "@angular/core";
import { AXBasePageComponent } from "acorex-ui";

@Component({
  selector: "test-page",
  templateUrl: "./test-page.html",
  styleUrls: ["./test-page.scss"]
})
export class TestPage extends AXBasePageComponent {
  @ViewChild("calendar", { read: ViewContainerRef })
  calendar: ViewContainerRef;
  showPopover: boolean = false;
  constructor(private el: ElementRef<HTMLElement>) {
    super();
  }
  onClick() {
    this.showPopover = !this.showPopover;
  }
}
