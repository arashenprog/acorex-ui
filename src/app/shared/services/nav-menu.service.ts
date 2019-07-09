import { Injectable } from "@angular/core";

import { PromisResult, MenuItem, AXTabPageService } from "acorex-ui";
import { AXNavMenuService } from "acorex-spa";
import { DemoPage } from "../../modules/demo/demo-page.component";
import { AliPage } from "src/app/modules/demo/ali/ali.page";
import { TestPage } from "src/app/modules/demo/test-page/test-page";
import { WidgetsPage } from 'src/app/modules/demo/widgets/widgets.page';

@Injectable()
export class NavMenuService extends AXNavMenuService {
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
    },
    {
      name: "ali",
      text: "Ali Work Page",
      icon: "fab fa-artstation",
      id: "00",
      visible: true,
      data: { page: AliPage }
    },
    {
      name: "test",
      text: "Test Page",
      icon: "fas fa-vial",
      id: "00",
      visible: true,
      data: { page: TestPage }
    },
    {
      name: "components",
      text: "Components",
      icon: "fas fa-vial",
      id: "003",
      visible: true,
    },
    {
      name: "forms",
      text: "Forms",
      id: "003-002",
      parentId:"003",
      visible: true,
    },
    {
      name: "data",
      text: "Data",
      id: "003-003",
      parentId:"003",
      visible: true,
    },
    {
      name: "layout",
      text: "Layouts",
      id: "003-001",
      parentId:"003",
      visible: true,
    },
    {
      name: "widgets",
      text: "Widgets",
      id: "003-001-001",
      parentId:"003-001",
      visible: true,
      data: { page: WidgetsPage }
    },
    {
      name: "dock",
      text: "Docks",
      id: "003-001-002",
      parentId:"003-001",
      visible: true
    },
    {
      name: "dock",
      text: "Drawer",
      id: "003-001-003",
      parentId:"003-001",
      visible: true
    },

  ];
  private mockItemFarsi: MenuItem[] = [
    {
      name: "dashboard",
      text: "Dashboard",
      icon: "fas fa-tachometer-alt",
      id: "0",
      visible: true
    }
  ];
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
        this.mockItems.filter(
          c => c.text.toLowerCase().includes(search.toLowerCase()) && c.parentId
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
