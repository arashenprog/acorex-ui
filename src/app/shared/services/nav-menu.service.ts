import { Injectable } from "@angular/core";

import { PromisResult, MenuItem , AXNavigator} from "acorex-ui";
import { AXNavMenuService } from "acorex-spa";


@Injectable()
export class NavMenuService extends AXNavMenuService {
  register(items: MenuItem[]): void {
    throw new Error("Method not implemented.");
  }
  constructor(private nav: AXNavigator) {
    super();
  }

  private mockItems: MenuItem[] = [
    {
      name: "dashboard",
      text: "Dashboard",
      icon: "fas fa-tachometer-alt",
      id: "0",
      visible: true,
      data: { path: '/DemoPage' }
    },
    {
      name: "ali",
      text: "Ali Work Page",
      icon: "fab fa-artstation",
      id: "00",
      visible: true,
      data: { path: '/AliPage'  }
    },
    {
      name: "test",
      text: "Test Page",
      icon: "fas fa-vial",
      id: "00",
      visible: true,
      data: { path:  '/TestPage' }
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
      parentId: "003",
      visible: true,
      data: {  }

    },
   
    {
      name: "data",
      text: "Data",
      id: "003-003",
      parentId: "003",
      visible: true,
    },
    {
      name: "filter",
      text: "Filter",
      id: "003-003-001",
      parentId: "003-003",
      visible: true,
      data: { path: '/components/Data/filter' }
    },
    {
      name: "layout",
      text: "Layouts",
      id: "003-001",
      parentId: "003",
      visible: true,
    },
    {
      name: "widgets",
      text: "Widgets",
      id: "003-001-001",
      parentId: "003-001",
      visible: true,
      data: { path: '/components/layout/widgets' }
    },
    {
      name: "dock",
      text: "Docks",
      id: "003-001-002",
      parentId: "003-001",
      visible: true
    },
    {
      name: "dock",
      text: "Drawer",
      id: "003-001-003",
      parentId: "003-001",
      visible: true
    },
    {
      name: "popover",
      text: "Popover",
      id: "003-001-004",
      parentId: "003-001",
      visible: true,
      data: { path: '/components/layout/popover' }
    },
    {
      name: "color-picker",
      text: "Color Picker",
      id: "003-003",
      parentId: "003",
      visible: true,
      data: { path: '/components/forms/colorpicker' }

    },
    {
      name: "pickers",
      text: "Pickers",
      id: "003-004",
      parentId: "003",
      visible: true,
      data: { path:  '/components/forms/pickers' }

    },
    {
      name: "toolbar",
      text: "Toolbar",
      id: "003-005",
      parentId: "003",
      visible: true,
      data: { path: '/components/components/pickers' }

    },
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

  search(search: string): PromisResult<MenuItem[]> {
    return new PromisResult(resolve => {
      resolve(
        this.mockItems.filter(
          c => c.text.toLowerCase().includes(search.toLowerCase()) && c.parentId
        )
      );
    });
  }

  clickItem(item: MenuItem): PromisResult<boolean> {
    if (item.data.path) {
      this.nav.navigate({
        title: item.text,
        path : item.data.path
      })
    }
    return PromisResult.resolve(true);
  }
}
