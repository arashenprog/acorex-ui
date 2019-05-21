import { Injectable } from "@angular/core";

import { PromisResult, MenuItem, AXTabPageService } from "acorex-ui";
import { AXNavMenuService } from "acorex-spa";
import { TestHttpComponent } from "../pages/http-test.page";
import { TestPageComponent } from "../test-page.component";
import { DashboardPage } from "../pages/dashboard/dashboard.page";
import { DemoPage } from "../demo-page.component";

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
      name: "components_demo",
      text: "Components Demo",
      id: "0_0",
      parentId: "0",
      visible: true,
      data: { page: DemoPage }
    },
    {
      name: "leads",
      text: "Leads",
      id: "0_1",
      parentId: "0",
      visible: true
    },
    {
      name: "quotes",
      text: "Quotes",
      id: "0_2",
      parentId: "0",
      visible: true
    },
    {
      name: "jobs",
      text: "Jobs",
      id: "0_3",
      parentId: "0",
      visible: true
    },
    {
      name: "tasks",
      text: "Tasks",
      id: "3_4",
      parentId: "3",
      visible: true
    },
    {
      name: "partners",
      text: "Partners",
      icon: "fas fa-users",
      id: "1",
      visible: true
    },
    {
      name: "customers",
      text: "Customers",
      id: "1_1",
      parentId: "1",
      visible: true,
      data: { page: TestHttpComponent }
    },
    {
      name: "suppliers",
      text: "Suppliers",
      id: "1_2",
      parentId: "1",
      visible: true
    },
    {
      name: "subcontractors",
      text: "Subcontractors",
      id: "1_3",
      parentId: "1",
      visible: true
    },
    {
      name: "staff",
      text: "Staff",
      id: "1_4",
      parentId: "1",
      visible: true
    },
    {
      name: "things_to_sell",
      text: "Things To Sell",
      icon: "fas fa-comment-dollar",
      id: "2",
      visible: true
    },
    {
      name: "products",
      text: "Products",
      id: "2_1",
      parentId: "2",
      visible: true
    },
    {
      name: "services",
      text: "Services",
      id: "2_2",
      parentId: "2",
      visible: true
    },

    {
      name: "accounts",
      text: "Accounts",
      icon: "fas fa-user-circle",
      id: "4",
      visible: true
    },
    {
      name: "orders",
      text: "Orders",
      id: "4_1",
      parentId: "4",
      visible: true
    },
    {
      name: "invoices",
      text: "Invoices",
      id: "4_2",
      parentId: "4",
      visible: true
    },
    {
      name: "monitor_things",
      text: "Monitor Things",
      icon: "fas fa-tv",
      id: "5",
      visible: true
    },
    {
      name: "calendar",
      text: "Calendar",
      id: "5_1",
      parentId: "5",
      visible: true
    },
    {
      name: "schedules",
      text: "Schedules",
      id: "5_2",
      parentId: "5",
      visible: true
    },
    {
      name: "map",
      text: "Map",
      id: "5_3",
      parentId: "5",
      visible: true
    },
    {
      name: "reports",
      text: "Reports",
      icon: "fas fa-file-alt",
      id: "6",
      visible: true
    },
    {
      name: "settings",
      text: "Settings",
      icon: "fas fa-cog",
      id: "7",
      visible: true
    },
    {
      name: "automations",
      text: "Automations",
      id: "7_1",
      parentId: "7",
      visible: true
    },
    {
      name: "email_templates",
      text: "Email Templates",
      id: "7_2",
      parentId: "7",
      visible: true
    },
    {
      name: "job_templates",
      text: "Job Templates",
      id: "7_3",
      parentId: "7",
      visible: true
    },
    {
      name: "sms_templates",
      text: "SMS Templates",
      id: "7_4",
      parentId: "7",
      visible: true
    },
    {
      name: "document_templates",
      text: "Document Templates",
      id: "7_5",
      parentId: "7",
      visible: true
    },
    {
      name: "preferences",
      text: "Preferences",
      id: "7_6",
      parentId: "7",
      visible: true
    },
    {
      name: "users",
      text: "Users",
      id: "7_7",
      parentId: "7",
      visible: true
    },
    {
      name: "forms",
      text: "Forms",
      id: "7_8",
      parentId: "7",
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
      resolve(this.mockItems);
      // Fix Me
      // resolve(this.mockItems.filter(c => favs.includes(c.id)));
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
          c.text.toLowerCase().includes(search.toLowerCase())
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
