import { Injectable } from "@angular/core";

import { PromisResult, MenuItem, AXTabPageService } from "acorex-ui";
import { AXNavMenuService } from "acorex-spa";

@Injectable()
export class NavMenuServiceFa extends AXNavMenuService {
  constructor(private tab: AXTabPageService) {
    super();
  }

  private mockItems: MenuItem[] = [
    {
      name: "dashboard",
      text: "Dashboard",
      icon: "fas fa-tachometer-alt",
      id: "0",
      visible: true
    }
    // ,
    // {
    //   name: "FormBuilder",
    //   text: "فرم پویا",
    //   icon: "fas fa-table",
    //   id: "0",
    //   visible: true,
    //   data: { page: DesignerPage }
    // }
  ]
  getItems(): PromisResult<MenuItem[]> {
    return new PromisResult(resolve => {
      resolve(this.mockItems);
    });
  }
  getFavorites(): PromisResult<MenuItem[]> {
    return new PromisResult(resolve => {
      let favs: string[] = localStorage.getItem("favs")
        ? JSON.parse(localStorage.getItem("favs"))
        : [];
      if (this.mockItems != null) {
        resolve(this.mockItems.filter(c => favs.some(d => d == c.id)));
      }
    });
  }


  setFavorites(menu: MenuItem, value: boolean): PromisResult<boolean> {
    let favs: string[] = localStorage.getItem("favs")
      ? JSON.parse(localStorage.getItem("favs"))
      : [];
    if (value) {
      if (!favs.some(c => c == menu.id)) {
        favs.push(menu.id);
      }
    } else {
      favs = favs.filter(c => c != menu.id);
    }
    localStorage.setItem("favs", JSON.stringify(favs));
    return PromisResult.resolve(true);
  }

  serach(search: string): PromisResult<MenuItem[]> {
    return new PromisResult(resolve => {
      resolve(
        this.mockItems.filter(c =>
          c.text.toLowerCase().includes(search.toLowerCase()) && c.parentId
        )
      );
    });
  }

  clickItem(item: MenuItem): PromisResult<boolean> {
    if (item.data.page) {
      // if(item.data.uid)
      // {
      //   this.tab.active(item.data.uid);
      // }
      // else
      // {
      //   this.tab.open({
      //     title: item.text,
      //     content: item.data.page,
      //     uid: item.data.uid
      //   });
      // }
      this.tab.open({
        title: item.text,
        content: item.data.page,
        uid: item.data.uid
      });
    }
    return PromisResult.resolve(true);
  }
}
