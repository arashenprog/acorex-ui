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
  @Input() mode: string = "single";
  @Input() textField: string = "text";


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
  }

  ngOnInit(): void {
  }

  constructor(private cdr: ChangeDetectorRef, private differs: IterableDiffers) {
    super();
  }

  onCheckValueChange(item: any, checked: boolean) {
    if (this.mode == "single") {
      this._selectedItems = [...item];
    }
    else {
      this._selectedItems = this._selectedItems.filter(c => c != item);
      if (checked)
        this._selectedItems.push(item);
      else {
        this._selectedItems = this._selectedItems.filter(c => c != item);
      }
    }
    //this.cdr.detectChanges();
  }

  ngDoCheck() {
    const changes = this.differs.find(this.selectedItems);
    if (changes) {
      this.cdr.detectChanges();
      this.selectedItemsChange.emit(this.selectedItems);
    }
  }

}
