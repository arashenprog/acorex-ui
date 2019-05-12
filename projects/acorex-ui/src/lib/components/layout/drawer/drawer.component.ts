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
      state("right", style({ transform: "translateX(0)" })),
      transition(":enter", [
        style({ transform: "translateX(100%)" }),
        animate("0.5s 300ms ease-in")
      ]),
      transition(":leave", [
        animate("0.3s ease-out", style({ transform: "translateX(0)" }))
      ]),
      state("left", style({ transform: "translateX(0)" })),
      transition(":enter", [
        style({ transform: "translateX(-100%)" }),
        animate("0.5s 300ms ease-in")
      ]),
      transition(":leave", [
        animate("0.3s ease-out", style({ transform: "translateX(0)" }))
      ])
    ]),
  ]
})
export class AXDrawerComponent implements OnInit {
  @Input() show: boolean = false;

  @Input("direction") direction: "left" | "right" = "left";
  @Input("float") float: boolean = true;

  _isRight = false;
  constructor() {}
  ngOnInit(): void {
    if (this.direction == "right") this._isRight = true;
    console.log(this.direction);
  }

  onClose(): void {
    this.show = false;
  }
}
