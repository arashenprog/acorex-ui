import { Injectable } from "@angular/core";

import { PromisResult, MenuItem, AXTabPageService } from "acorex-ui";
import { AXNavMenuService } from "acorex-spa";
import { TestHttpComponent } from "../pages/http-test.page";
import { TestPageComponent } from "../test-page.component";
import { DashboardPage } from '../pages/dashboard/dashboard.page';

@Injectable()
export class NavMenuService extends AXNavMenuService {
  constructor(private tab: AXTabPageService) {
    super();
  }

  private mockItems: MenuItem[] = [
    {
      name: "dashboard",
      text: "Dashboard",
      id: "0",
      visible: true,
      data: { page: DashboardPage, uid: "dashboard" }
    },
    {
      name: "customers",
      text: "Customers",
      id: "1",
      visible: true,
      data: { page: TestHttpComponent }
    },
    {
      name: "suppliers",
      text: "Suppliers",
      id: "2",
      visible: true
    },
    {
      name: "subcontractors",
      text: "Subcontractors",
      id: "3",
      visible: true
    },
    
    {
      name: "products",
      text: "Products",
      id: "4",
      visible: true
    },
    {
      name: "services",
      text: "Services",
      id: "5",
      visible: true
    },
    {
      name: "leads",
      text: "Leads",
      id: "6",
      visible: true
    },
    {
      name: "quotes",
      text: "Quotes",
      id: "7",
      visible: true
    },
    {
      name: "jobs",
      text: "Jobs",
      id: "8",
      visible: true
    },
    {
      name: "tasks",
      text: "Tasks",
      id: "9",
      visible: true
    },
    {
      name: "orders",
      text: "Orders",
      id: "10",
      visible: true
    },
    {
      name: "invoices",
      text: "Invoices",
      id: "11",
      visible: true
    },
    {
      name: "Calendar",
      text: "calendar",
      id: "12",
      visible: true
    },
    { name: "settings", text: "Settings", id: "13", visible: true },
    {
      name: "automations",
      text: "Automations",
      id: "13_1",
      parentId: "13",
      visible: true
    },
    {
      name: "email_templates",
      text: "Email Templates",
      id: "13_2",
      parentId: "13",
      visible: true
    },
    {
      name: "job_templates",
      text: "Job Templates",
      id: "13_3",
      parentId: "13",
      visible: true
    },
    {
      name: "sms_templates",
      text: "SMS Templates",
      id: "13_4",
      parentId: "13",
      visible: true
    },
    {
      name: "document_templates",
      text: "Document Templates",
      id: "13_5",
      parentId: "13",
      visible: true
    },
    {
      name: "preferences",
      text: "Preferences",
      id: "13_6",
      parentId: "13",
      visible: true
    },
    {
      name: "users",
      text: "Users",
      id: "13_7",
      parentId: "13",
      visible: true
    },
    {
      name: "forms",
      text: "Forms",
      id: "13_8",
      parentId: "13",
      visible: true
    },
    {
      name: "staff",
      text: "Staff",
      id: "14",
      visible: true
    },
    {
      name: "map",
      text: "Map",
      id: "15",
      visible: true
    },
    {
      name: "report",
      text: "Report",
      id: "16",
      visible: true
    },
    {
      name: "inbox",
      text: "Inbox",
      id: "17",
      visible: true
    },
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
    if (item.data.page)
    {
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
