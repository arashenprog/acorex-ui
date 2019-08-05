import {
  Component,
  ViewEncapsulation,
  Output,
  EventEmitter,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from "@angular/core";
import { AXBaseComponent } from "../../../core/base.class";

@Component({
  selector: "ax-check-box",
  templateUrl: "./checkbox.component.html",
  styleUrls: ["./checkbox.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXCheckBoxComponent extends AXBaseComponent {

  constructor(private cdr: ChangeDetectorRef) {
    super();
  }

  @Input() label: string = "";

  // Value
  @Output()
  valueChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  //
  protected _value: boolean = false;
  //
  set value(val: boolean) {
    if (this._value !== val) {
      this._value = val;
      this.valueChange.emit(val);
      this.cdr.markForCheck();
      this.cdr.detectChanges();
    }
  }
  //
  @Input()
  get value() {
    return this._value;
  }
}
