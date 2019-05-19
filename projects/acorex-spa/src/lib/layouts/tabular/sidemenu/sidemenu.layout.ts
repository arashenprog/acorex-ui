import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewEncapsulation
} from "@angular/core";
import { MenuItem } from "acorex-ui";
import { distinctUntilChanged, debounceTime } from "rxjs/operators";
import { AXNavMenuService } from "../../shared/services/nav-menu.service";
import { Observable } from "rxjs";
import { InternalFormsSharedModule } from "@angular/forms/src/directives";

@Component({
  selector: "ax-side-menu",
  templateUrl: "./sidemenu.layout.html",
  styleUrls: ["./sidemenu.layout.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXSideMenuComponent {
  constructor(
    private navMenuService: AXNavMenuService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    if (document.getElementsByTagName("body")[0].classList.contains("rtl")) {
      this.isRtl = true;
    }
  }

  searchText: string;
  searchChangeObserver: any;

  current: MenuItem = null;
  favoriteCheck: boolean = false;
  private items: MenuItem[] = [];
  private allItems: MenuItem[] = [];
  private favoriteItems: MenuItem[] = [];
  displayItems: any[] = [];
  isRtl: boolean = false;

  private refresh() {
    if (this.searchText) {
      this.navMenuService.serach(this.searchText).then(c => {
        this.displayItems = c.map(c => this.mapToDisplay(c));
        this.changeDetectorRef.markForCheck();
      });
    } else {
      if (this.favoriteCheck)
        this.displayItems = this.favoriteItems.map(c => this.mapToDisplay(c));
      else
        this.displayItems = this.items.slice().map(c => this.mapToDisplay(c));
      //
      this.changeDetectorRef.markForCheck();
    }
  }

  private mapToDisplay(item: MenuItem) {
    let i: any = Object.assign({}, item);
    i.isRoot = this.allItems.some(c => c.parentId == item.id);
    i.isFav = this.favoriteItems.some(c => c.id == item.id);
    return i;
  }

  ngOnInit() {
    this.navMenuService.getItems().then(c => {
      this.allItems = c;
      this.items = this.allItems.filter(c => !c.parentId).slice();
      this.navMenuService.getFavorites().then(c => {
        this.favoriteItems = c;
        this.refresh();
      });
    });
  }

  onItemClick(item: any) {
    if (item.isRoot) {
      this.current = item;
      this.items = this.allItems.filter(c => c.parentId == item.id).slice();
      this.refresh();
    } else {
      this.navMenuService.clickItem(item).then(c => {
        //
      });
    }
  }

  onBackClick() {
    if (this.current && this.current.parentId) {
      this.items = this.allItems
        .filter(c => c.parentId == this.current.parentId)
        .slice();
      this.current = this.allItems.find(c => c.id == this.current.parentId);
    } else {
      this.current = null;
      this.items = this.allItems.filter(c => !c.parentId).slice();
      this.refresh();
    }
  }

  onFavoriteClick(e) {
    this.favoriteCheck = !this.favoriteCheck;
    this.refresh();
  }

  onToggleFav(item: any) {
    item.isFav = !item.isFav;
    if (item.isFav) {
      if (!this.favoriteItems.some(c => c.name == item.name)) {
        this.favoriteItems.push(item);
      }
    } else {
      this.favoriteItems = this.favoriteItems.filter(c => c.name != item.name);
    }
    this.navMenuService.setFavorites(item, item.isFav);
  }

  onSearchChanged(text: string) {
    if (!this.searchChangeObserver) {
      Observable.create(observer => {
        this.searchChangeObserver = observer;
      })
        .pipe(debounceTime(300))
        .pipe(distinctUntilChanged())
        .subscribe(c => {
          this.searchText = c;
          this.refresh();
        });
    }

    this.searchChangeObserver.next(text);
  }
}
