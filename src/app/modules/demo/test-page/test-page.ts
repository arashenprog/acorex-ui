import { Component, OnInit } from "@angular/core";
import { AXBasePageComponent } from "acorex-ui";

@Component({
  selector: "test-page",
  templateUrl: "./test-page.html",
  styleUrls: ["./test-page.scss"]
})
export class TestPage extends AXBasePageComponent {
  constructor() {
    super();
  }

  ngOnInit(): void {}
}
