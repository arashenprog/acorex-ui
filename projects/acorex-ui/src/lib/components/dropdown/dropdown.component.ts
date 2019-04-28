import { Component, Input } from "@angular/core";

@Component({
  selector: "ax-dropdown",
  templateUrl: "./dropdown.component.html"
})
export class AXDropdownComponent {
  @Input() title: string = "Card Title";
  @Input() text: string = "Your text or blah blah blah goes here...";
  @Input() imageUrl: string;
  @Input() buttonVisible: boolean = false;
}
