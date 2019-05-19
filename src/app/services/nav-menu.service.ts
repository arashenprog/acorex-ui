import { Injectable } from "@angular/core";

import { PromisResult, MenuItem, AXTabPageService } from "acorex-ui";
import { AXNavMenuService } from "acorex-spa";
import { TestHttpComponent } from "../pages/http-test.page";
import { TestPageComponent } from "../test-page.component";

@Injectable()
export class NavMenuService extends AXNavMenuService {
  constructor(private tab: AXTabPageService) {
    super();
  }

  private mockItems: MenuItem[] = [
    {
      name: "item1",
      text: "Home",
      id: "10",
      visible: true,
      data: { page: TestPageComponent, token: "" }
    },
    {
      name: "item2",
      text: "Http Test",
      id: "20",
      visible: true,
      data: { page: TestHttpComponent }
    },
    { name: "item3", text: "Item 1", id: "30", visible: true },
    { name: "item4", text: "Item 2", id: "40", visible: true },
    {
      name: "item11",
      text: "Item 3",
      id: "101",
      parentId: "40",
      visible: true
    },
    { name: "item12", text: "Item 4", id: "102", parentId: "40", visible: true }
  ];

  getItems(): PromisResult<MenuItem[]> {
    return new PromisResult(resolve => {
      resolve(this.mockItems);
    });
  }
  getFavorites(): PromisResult<MenuItem[]> {
    return new PromisResult(resolve => {
      let favs: string[] = localStorage.getItem("favs") ? JSON.parse(localStorage.getItem("favs")) : [];
      resolve(this.mockItems.filter(c => favs.includes(c.id)));
    });
  }

  setFavorites(menu: MenuItem, value: boolean): PromisResult<boolean> {
    let favs: string[] = localStorage.getItem("favs") ? JSON.parse(localStorage.getItem("favs")) : [];
    if (value) {
      if (!favs.some(c => c == menu.id)) {
        favs.push(menu.id);
      }
    }
    else {
      favs = favs.filter(c => c != menu.id);
    }
    localStorage.setItem("favs", JSON.stringify(favs));
    return PromisResult.resolve(true);
  }

  serach(search: string): PromisResult<MenuItem[]> {
    return new PromisResult(resolve => {
      resolve(this.mockItems.filter(c => c.text.toLowerCase().includes(search.toLowerCase())));
    });
  }

  clickItem(item: MenuItem): PromisResult<boolean> {
    return new PromisResult(resolve => {
      //console.log(item);
      if (item.data.page)
        this.tab.open({
          title: item.text,
          content: item.data.page,
          uid: item.data.id
        });
      resolve(true);
    });
  }
}