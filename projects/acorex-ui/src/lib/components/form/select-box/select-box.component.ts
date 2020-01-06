import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter
} from "@angular/core";
import { SelectItem } from "../../../core/select.class";
import { AXSelectBaseComponent } from "../../../core/base.class";
import { AXPopoverComponent } from "../../layout/popover/popover.component";
import { AXDropDownComponent } from "../drop-down/drop-down.component";
import { AXDataListComponent } from "../../data/data-list/core/data-list.component";
import { AXKeyboardEvent } from "../../../core/events/keyboard";

@Component({
  selector: "ax-select-box",
  templateUrl: "./select-box.component.html",
  styleUrls: ["./select-box.component.scss"]
})
export class AXSelectBoxComponent extends AXDataListComponent {
  constructor() {
    super();
  }
  @ViewChild("d", { static: true }) dropdown: AXDropDownComponent;

  @Input() allowSearch: boolean = false;
  @Input() label: string;
  @Input() textField: string = "text";
  @Input() valueField: string = "value";
  @Input() mode: "single" | "multiple" = "single";

  // #region Search 

  @Output()
  searchTextChange: EventEmitter<string> = new EventEmitter<string>();
  private _searchText: string;
  @Input()
  public get searchText(): string {
    return this._searchText;
  }
  public set searchText(v: string) {
    if (v != this._searchText) {
      this._searchText = v;
      this.searchTextChange.emit(v);
    }
  }
  text: string = "";

  // #endregion 

  @Output()
  selectedItemsChange: EventEmitter<any[]> = new EventEmitter<any[]>();

  private _selectedItems: any[] = [];
  @Input()
  public get selectedItems(): any[] {
    return this._selectedItems;
  }
  public set selectedItems(v: any[]) {
    if (!v) v = [];
    this._selectedItems = v;
    if (v) {
      this.items.forEach(c => (c.selected = false));
      v.forEach(c => (c.selected = true));
      this.text = v.map(c => c[this.textField]).join(", ");
    }
    this.selectedItemsChange.emit(v);
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
    ;
    let old = this.selectedValues;
    if (JSON.stringify(old) != JSON.stringify(v)) {
      if (this.mode == "single") {
        this.selectedItems = this.items.filter(c => v == c[this.valueField]);
      }
      else {
        if (Array.isArray(v))
          this.selectedItems = this.items.filter(c => v.includes(c[this.valueField]));
        else if (v)
          this.selectedItems = this.items.filter(c => v == c[this.valueField]);
        else
          this.selectedItems = [];
      }
      this.selectedValuesChange.emit(this.selectedValues);
    }
  }


  ngAfterViewInit(): void {
    this.refresh();
  }

  handleItemClick(item: any) {
    let value = item[this.valueField];
    if (this.mode == "single") {
      this.selectedValues = value;
    }
    else {
      let exists = this.selectedValues.slice(0);
      if (exists.includes(value)) {
        this.selectedValues = exists.filter(c => c != value);
      }
      else {
        exists.push(value);
        this.selectedValues = exists;
      }
    }
    this.dropdown.close();
  }

  handleSearchChanged(text: string) {
    super.fetch({
      searchText: text
    });
  }
}
