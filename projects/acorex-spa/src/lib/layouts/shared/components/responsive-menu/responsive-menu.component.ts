import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "ax-responsive-menu",
  templateUrl: "./responsive-menu.component.html",
  styleUrls: ["./responsive-menu.component.scss"]
})
export class AXResponsiveMenuComponent implements OnInit {
  constructor() {}

  @Input() show: boolean = false;

  @Input() direction: "left" | "right" = "left";
  @Input() mode: "inner" | "outer" = "inner";
  @Input() close: "onBlur" | "button" = "onBlur";
  @Input() overlay: boolean = false;

  onClose(e): void {
    if (this.close == "onBlur" || this.close == "button") {
      e.preventDefault();
      this.show = false;
    }
  }

  ngOnInit(): void {}
}
