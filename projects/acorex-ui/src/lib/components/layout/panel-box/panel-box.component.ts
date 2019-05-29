import { Component, Input, Output, EventEmitter } from "@angular/core";
import {
  trigger,
  state,
  style,
  animate,
  transition
} from "@angular/animations";
import { AXButtonBaseComponent } from "../../../core/base.class";
import { ButtonItem } from "../../../core/menu.class";

@Component({
  selector: "ax-panel-box",
  templateUrl: "./panel-box.component.html",
  styleUrls: ["./panel-box.component.scss"],
  animations: [
    trigger("visibilityChanged", [
      state("shown", style({ opacity: 1, height: "*" })),
      state(
        "hidden",
        style({
          opacity: 0,
          height: "0px",
          overflow: "hidden",
          display: "none"
        })
      ),
      transition("shown => hidden", animate("200ms")),
      transition("hidden => shown", animate("300ms"))
    ])
  ]
})
export class AXPanelBoxComponent extends AXButtonBaseComponent {
  // _inlineButtons: Array<ButtonItem> = [];
  // _dropdownButtons: Array<ButtonItem> = [];
  // private _buttons: Array<ButtonItem> = [];

  // @Input()
  // get buttons() {
  //   return this._buttons;
  // }

  // set buttons(val: Array<ButtonItem>) {
  //   this._buttons = val || [];
  //   this._inlineButtons = this._buttons.filter(c => !c.dropdown);
  //   this._dropdownButtons = this._buttons.filter(c => c.dropdown);
  // }

  // onClickInner() {
  //   this.onClick.emit("test");
  // }

  // visiblityState: string = "shown";

  // @Output() captionChange: EventEmitter<string> = new EventEmitter<string>();
  // private _caption: string;
  // @Input()
  // get caption(): string {
  //   return this._caption;
  // }
  // set caption(val: string) {
  //   this._caption = val || "caption";
  //   this.captionChange.emit(this._caption);
  // }

  // @Output() collapsedChange: EventEmitter<boolean> = new EventEmitter<
  //   boolean
  // >();
  // private _collapsed: boolean = false;

  // @Input()
  // get collapsed(): boolean {
  //   return this._collapsed;
  // }
  // set collapsed(val: boolean) {
  //   if (val != this._collapsed) {
  //     this._collapsed = val;
  //     this.visiblityState = val ? "hidden" : "shown";
  //     this.collapsedChange.emit(this._collapsed);
  //   }
  // }

  // @Input()
  // isParent: boolean = false;

  // @Input()
  // allowCollapse: boolean = true;

  // @Input()
  // dockParrent: boolean = false;

  // toggle() {
  //   this.collapsed = !this.collapsed;
  // }
  @Input() title: string;
  show: boolean = true;
  togglePanel(){
    this.show = !this.show;
  }
}
