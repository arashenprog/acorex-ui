import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef, ViewEncapsulation, IterableDiffers, EventEmitter } from "@angular/core";
import { CheckItem } from "../../../core/menu.class";
import { AXBaseComponent } from "../../../core/base.class";
import { Output } from "@angular/core";

@Component({
  selector: "ax-selection-list",
  templateUrl: "./selection-list.component.html",
  styleUrls: ["./selection-list.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXSelectionListComponent extends AXBaseComponent {
  _uid: string = "M" + Math.ceil(Math.random() * 10000);
  @Input() direction: string = "horizontal";
  @Input() items: Array<any> = [];
  @Input() mode: "single" | "multiple" = "single";
  @Input() textField: string = "text";
  @Input() valueField: string = "value";


  @Output()
  selectedItemsChange: EventEmitter<any[]> = new EventEmitter<any[]>();

  private _selectedItems: any[] = [];
  @Input()
  public get selectedItems(): any[] {
    return this._selectedItems || [];
  }
  public set selectedItems(v: any[]) {
    this._selectedItems = v;
    this.selectedItemsChange.emit(this.selectedItems);
    //this.selectedValuesChange.emit(this.selectedValues);
    //this.cdr.markForCheck();
    this.cdr.detectChanges();
  }

  @Output()
  selectedValuesChange: EventEmitter<any[] | any> = new EventEmitter<any[] | any>();

  @Input()
  public get selectedValues(): any[] | any {
    if (this.mode == "single")
      return this._selectedItems.map(c => c[this.valueField])[0];
    else
      return this._selectedItems.map(c => c[this.valueField]) || [];
  }
  public set selectedValues(v: any[] | any) {
    let old = this.selectedValues;
    if (v == null)
      v = [];
    if (JSON.stringify(old) != JSON.stringify(v)) {
      if (this.mode == "single") {
        this.selectedItems = this.items.filter(c => v == c[this.valueField]);
      }
      else {
        if (Array.isArray(v))
          this.selectedItems = this.items.filter(c => v.includes(c[this.valueField]));
        else
          this.selectedItems = [];
      }
      this.selectedValuesChange.emit(this.selectedValues);
    }
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  constructor(private cdr: ChangeDetectorRef) {
    super();
  }

  onCheckValueChange(value: any, checked: boolean) {
    if (this.mode == "single") {
      this.selectedValues = [value];
    }
    else {
      if (checked) {
        if (!this.selectedValues.includes(value)) {
          this.selectedValues = [...this.selectedValues, ...[value]];
        }
      }
      else {
        this.selectedValues = this.selectedValues.filter(c => c != value);
      }
    }
  }
}
