import { Component, Input } from "@angular/core";
@Component({
  selector: "ax-container",
  templateUrl: "./container.component.html"
})
export class AXContainerComponent {
  @Input() value: string = "container";
  constructor() {}
}