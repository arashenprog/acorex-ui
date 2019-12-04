import {
  Component,
  ViewEncapsulation,
  Output,
  EventEmitter,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from "@angular/core";
import { AXBaseComponent, AXCheckedBaseComponent } from "../../../core/base.class";

@Component({
  selector: "ax-check-box",
  templateUrl: "./checkbox.component.html",
  styleUrls: ["./checkbox.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXCheckBoxComponent extends AXCheckedBaseComponent {

  constructor(protected cdr: ChangeDetectorRef) {
    super(cdr);
  }

  // @Input() label: string = "";

  // // Value
  // @Output()
  // valueChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  // //
  // protected _value: boolean = false;
  // //
  // set value(val: boolean) {
  //   if (this._value !== val) {
  //     this._value = val;
  //     this.valueChange.emit(val);
  //     this.cdr.markForCheck();
  //     this.cdr.detectChanges();
  //   }
  // }
  // //
  // @Input()
  // get value() {
  //   return this._value;
  // }
}
