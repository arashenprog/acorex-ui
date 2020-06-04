import {
  Component,
  ElementRef,
  ViewChild,
  ViewContainerRef
} from "@angular/core";
import { AXBasePageComponent, SelectItem } from "acorex-ui";

@Component({
  selector: "test-page",
  templateUrl: "./test-page.html",
  styleUrls: ["./test-page.scss"]
})
export class TestPage extends AXBasePageComponent {

  selectBoxItems: any[] = [];

  @ViewChild("calendar", { read: ViewContainerRef })
  calendar: ViewContainerRef;
  showPopover: boolean = false;
  constructor(private el: ElementRef<HTMLElement>) {
    super();
    for (let i = 1; i < 100; i++) {
      this.selectBoxItems.push({
        text: `Item${i}`,
        value: i
      })

    }
  }
  onClick() {
    this.showPopover = !this.showPopover;
  }
}
