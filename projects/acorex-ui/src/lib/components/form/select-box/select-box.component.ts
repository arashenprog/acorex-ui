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
  @ViewChild("d") dropdown: AXDropDownComponent;

  @Input() allowSearch: boolean = true;
  @Input() label: string;
  @Input() textField: string = "text";
  @Input() valueField: string = "value";
  @Input() defaultValue: SelectItem;

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
      this.text = v.map(c => c[this.textField]).join(",");
    }
    this.selectedItemsChange.emit(v);
  }

  ngAfterViewInit(): void {
    this.refresh();
  }

  handleItemClick(item: any) {
    this.selectedItems = [item];
    this.dropdown.close();
  }

  handleSearchChanged(text: string) {
    super.fetch({
      searchText: text
    });
  }
}
