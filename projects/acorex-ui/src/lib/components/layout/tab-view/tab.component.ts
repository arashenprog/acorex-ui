import { Component, Input } from "@angular/core";
@Component({
  selector: "ax-tab",
  templateUrl: "./tab.component.html"
})
export class AXTabComponent {
  @Input() caption: string;
  @Input() name: string;
  @Input() active = false;
  @Input() isCloseable = false;
  @Input() template;
  @Input() dataContext;
  @Input() icon:string;
}
