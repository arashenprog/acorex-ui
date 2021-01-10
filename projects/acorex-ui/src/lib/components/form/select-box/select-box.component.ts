import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from "@angular/core";
import { AXDropDownComponent } from "../drop-down/drop-down.component";
import { AXDataListComponent } from "../../data/data-list/core/data-list.component";
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

export class AXDataColumn {
  title:string;
  dataField: string;
}

@Component({
  selector: "ax-select-box",
  templateUrl: "./select-box.component.html",
  styleUrls: ["./select-box.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXSelectBoxComponent extends AXDataListComponent {

  @ViewChild(CdkVirtualScrollViewport) virtualScroll: CdkVirtualScrollViewport;

  constructor(private cdr: ChangeDetectorRef) {
    super();
  }
  @ViewChild("d", { static: true }) dropdown: AXDropDownComponent;

  @Input() allowSearch: boolean = false;
  @Input() label: string;
  @Input() textField: string = "text";
  @Input() valueField: string = "value";
  @Input() mode: "single" | "multiple" = "single";
  @Input() itemHeight: number = 34;
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;


  @Input() columns: AXDataColumn[] = [];



  @Output()
  onOpen: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  onClose: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  isLoadingChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  private _isLoading: boolean;
  @Input()
  public get isLoading(): boolean {
    return this._isLoading;
  }
  public set isLoading(v: boolean) {

    if (v != this._isLoading) {
      this._isLoading = v;
      this.cdr.markForCheck();
      this.isLoadingChange.emit(v);
    }
  }


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
      this.cdr.markForCheck();
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
    if (!v) {
      v = [];
    }
    if (JSON.stringify(this._selectedItems) != JSON.stringify(v)) {
      this._selectedItems = [...new Set(v)];
      this.text = this._selectedItems.map(c => c[this.textField]).join(", ");
      this.selectedItemsChange.emit(this._selectedItems);
      this.selectedValuesChange.emit(this.selectedValues);
    }
  }

  @Output()
  selectedValuesChange: EventEmitter<any[] | any> = new EventEmitter<any[] | any>();

  @Input()
  public get selectedValues(): any[] | any {
    if (this.mode == "single")
      return this.selectedItems.map(c => c[this.valueField])[0];
    else
      return this.selectedItems.map(c => c[this.valueField]) || [];
  }
  public set selectedValues(v: any[] | any) {
    let old = this.selectedValues;
    if (JSON.stringify(old) != JSON.stringify(v)) {
      this.waitForData(() => {
        if (this.mode === 'single') {
          this.selectedItems = this.items.filter(c => v === c[this.valueField]);
        }
        else {
          if (Array.isArray(v)) {
            this.selectedItems = this.items.filter(c => v.includes(c[this.valueField]));
          }
          else if (v) {
            this.selectedItems = this.items.filter(c => v === c[this.valueField]);
          }
          else {
            this.selectedItems = [];
          }
        }
      });

    }
  }



  ngAfterViewInit(): void {
    if (this.dataSource) {
      this.dataSource.onFetchStart.subscribe(() => {
        this.isLoading = true;
      });
      this.dataSource.onDataReceived.subscribe(() => {
        this.isLoading = false;
      });
    }
    //
    this.itemsChange.subscribe(() => {
      if (this.virtualScroll) {
        this.virtualScroll.scrollToIndex(0);
        this.cdr.markForCheck();
      }
    });
    //  
    this.refresh();
  }



  handleItemClick(item: any) {
    if (this.mode == "single") {
      this.selectedItems = [item];
    }
    else {
      let exists = this.selectedItems.slice(0);
      if (exists.some(c => c[this.valueField] === item[this.valueField])) {
        this.selectedItems = exists.filter(c => c[this.valueField] !== item[this.valueField]);
      }
      else {
        exists.push(item);
        this.selectedItems = exists;
      }
    }
    this.dropdown.close();
  }

  handleSearchChanged(text: string) {
    this.searchText = text;
    super.fetch({
      searchText: this.searchText
    });
  }

  isItemSelected(item) {
    return this.selectedItems.some(c => c[this.valueField] == item[this.valueField]);
  }

  get displayItems(): any[] {
    if (this.items == null) {
      return [];
    }
    return this.searchText ?
      this.items.filter(c => (c[this.textField] as string).toLowerCase().includes(this.searchText.toLowerCase())) :
      this.items;
  }

  private itemsStatusObserver: any;
  private waitForData(callbackfn: () => void) {
    if (this.items && this.items.length) {
      callbackfn();
    }
    else if (!this.itemsStatusObserver) {
      Observable.create(observer => {
        this.itemsStatusObserver = observer;
      })
        .pipe(debounceTime(50))
        .pipe(distinctUntilChanged())
        .subscribe(c => {
          callbackfn();
        });
    }
  }

  ngDoCheck() {
    if (this.itemsStatusObserver) {
      this.itemsStatusObserver.next(this.items ? this.items.length : -1);
    }

  }

  trackByFn(index, item) {
    return item[this.valueField];
  }

  handleOnOpen() {
    this.onOpen.emit();
  }

  handleOnClose() {
    this.onClose.emit();
  }

}
