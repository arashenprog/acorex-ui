import { Component, OnInit, Input, ElementRef } from "@angular/core";
import { timeout } from "q";
import { timer } from "rxjs";

@Component({
  templateUrl: "./toast-message.component.html",
  styleUrls: ["./toast-message.component.scss"]
})
export class AXToastMessageComponent implements OnInit {
  constructor(private elRef: ElementRef) {}
  @Input() title: string;
  @Input() message: string;
  @Input() timeOut: number = 1000;
  @Input() closeable: boolean;

  @Input() toastWidth: number = 100;
  @Input() type: "info" | "success" | "warning" | "error" = "info";

  _style: string = "primary";
  _icon: string = "primary";

  ngOnInit(): void {
    if (this.timeOut) {
      let timer = setTimeout(() => {
        debugger;
        this.close();
      }, this.timeOut);
      setInterval(() => {
        for (let i = this.timeOut; i <= 0; i++) {
          debugger;
          --this.timeOut;
          console.log(this.timeOut);
          clearInterval(timer);
        }
      });
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
