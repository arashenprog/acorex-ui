import { Component } from "@angular/core";
import { MenuItem } from "acorex-ui"
import { AXNavMenuService } from '../../shared/services/nav-menu.service';


@Component({
  selector: "ax-side-menu",
  templateUrl: "./sidemenu.layout.html"
})
export class AXSideMenuComponent {



  constructor(private navMenuService: AXNavMenuService) {

  }

  searchText: string;
  current: MenuItem = null;
  favoriteCheck: boolean = false;
  private items: MenuItem[];
  private allItems: MenuItem[] = [];
  currentItems: MenuItem[] = []


  // get currentItems(): Promise<MenuItem[]> {
  //   return new Promise((resolve, reject) => {
  //     if (this.searchText) {
  //       return this.search(this.searchText);
  //     } else {
  //       if (this.favoriteCheck) resolve(this.favoriteItems);
  //       else return resolve(this.items.filter(c => c.visible));
  //     }
  //   });
  // }

  favoriteItems: MenuItem[] = []

  ngOnInit() {
    this.navMenuService.getItems().then(c => {
      debugger;
      this.allItems = c;
      this.refresh();
    })
    this.navMenuService.getFavorites().then(c => {
      this.allItems = c;
    })
  }

  private refresh() {
    this.items = this.allItems.filter(c => c.parentId == null).slice();
    if (this.searchText) {
      this.search(this.searchText).then(d => {
        this.currentItems = d;
      });
    } else {
      if (this.favoriteCheck)
        this.currentItems = this.favoriteItems.slice();
      else
        this.currentItems = this.items.filter(c => c.visible).slice();
    }
  }

  onItemClick(item: MenuItem) {
    this.navMenuService.clickItem(item)
  }


  onBackClick() {
    if (this.current && this.current.parentId) {
      this.items = this.allItems
        .filter(c => c.parentId == this.current.parentId)
        .slice();
      this.current = this.allItems.find(
        c => (c.id == this.current.parentId)
      );
    } else {
      this.current = null;
      this.refresh();
    }
  }

  private search(text: string): Promise<MenuItem[]> {
    return new Promise((resolve, reject) => {
      this.navMenuService.serach(text).then(c => {
        resolve(c);
      });
    });
  }

  onFavoriteClick(e) {
    this.favoriteCheck = !this.favoriteCheck;
  }


  onToggleFav(item: MenuItem) {
    if (!item.data)
      item.data = {};
    item.data.fav = item.data.fav == true ? false : true
    if (item.data.fav) {
      if (!this.favoriteItems.some(c => c.name == item.name)) {
        this.favoriteItems.push(item);
      }
    }
    else {
      this.favoriteItems = this.favoriteItems.filter(c => c.name != item.name);
    }
    this.navMenuService.setFavorites(item, item.data.fav);
  }

}
