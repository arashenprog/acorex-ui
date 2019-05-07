import { Component, Input } from "@angular/core";

@Component({
  selector: "ax-badge",
  templateUrl: "./badge.component.html"
})
export class AXBadgeComponent {
  @Input() text: string;
}
