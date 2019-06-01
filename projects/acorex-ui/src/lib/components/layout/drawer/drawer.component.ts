import { Component, OnInit, Input, Attribute } from "@angular/core";
import {
  trigger,
  transition,
  state,
  style,
  animate
} from "@angular/animations";

@Component({
  selector: "ax-drawer",
  templateUrl: "./drawer.component.html",
  styleUrls: ["./drawer.component.scss"],
  animations: [
    trigger("openDrawer", [
      state("true", style({ left: "-20%" })),
      state("true", style({ left: "0%" })),
      transition("0 => 1", animate(".2s")),
      transition("1 => 0", animate(".2s"))
    ])
  ]
  // animations: [
  //   trigger("openDrawerRight", [
  //     state("right", style({ transform: "translateX(0)" })),
  //     transition(":enter", [
  //       style({ transform: "translateX(100%)" }),
  //       animate("0.5s 300ms ease-in")
  //     ]),
  //     transition(":leave", [
  //       animate("0.3s ease-out", style({ transform: "translateX(0)" }))
  //     ]),

  //   ]),
  //   trigger("openDrawerLeft",[
  //     state("left", style({ transform: "translateX(-100%)" })),
  //     transition(":enter", [
  //       style({ transform: "translateX(-100%)" }),
  //       animate("0.5s 300ms ease-in")
  //     ]),
  //     transition(":leave", [
  //       animate("0.3s ease-out", style({ transform: "translateX(0)" }))
  //     ])
  //   ])
  // ]
})
export class AXDrawerComponent {
  @Input() show: boolean = false;

  @Input() direction: "left" | "right" = "right";
  @Input() mode: "inner" | "outer" = "inner";
  @Input() close: "onBlur" | "button" = "onBlur";
  @Input() overlay: boolean = false;

  onClose(e): void {
    if (this.close == "onBlur" || this.close == "button") {
      e.preventDefault();
      this.show = false;
    }
  }


  onAreaClick(e)
  {
    e.stopImmediatePropagation();
  }
}
