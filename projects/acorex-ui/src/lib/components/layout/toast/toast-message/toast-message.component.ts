import { Component, OnInit, Input, ElementRef, ViewEncapsulation } from "@angular/core";

@Component({
  templateUrl: "./toast-message.component.html",
  styleUrls: ["./toast-message.component.scss"],
  encapsulation:ViewEncapsulation.None
})
export class AXToastMessageComponent implements OnInit {
  constructor(private elRef: ElementRef) {}
  @Input() title: string;
  @Input() message: string;
  @Input() timeOut: number = 2000;
  @Input() closeable: boolean;

  @Input() type: "info" | "success" | "warning" | "error" = "info";

  _style: string = "primary";
  _icon: string = "primary";
  _toastWidth: number = 100;

  ngOnInit(): void {
    if (this.timeOut) {
      let interval = setInterval(() => {
        --this._toastWidth;
        if (this._toastWidth === 0) {
          clearInterval(interval);
          this.close();
        }
      }, this.timeOut/100
      );
    }
    switch (this.type) {
      case "success":
        this._style = "success";
        break;
      case "warning":
        this._style = "warning";
        break;
      case "error":
        this._style = "danger";
        break;
      default:
        this._style = "primary";
        break;
    }
    switch (this.type) {
      case "success":
        this._icon = "fas fa-check-circle";
        break;
      case "warning":
        this._icon = "fas fa-exclamation-triangle";
        break;
      case "error":
        this._icon = "fas fa-exclamation-circle";
        break;
      default:
        this._icon = "fas fa-info-circle";
        break;
    }
  }
  close() {
    this.elRef.nativeElement.parentElement.removeChild(
      this.elRef.nativeElement
    );
  }
}
