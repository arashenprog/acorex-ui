import { Injectable } from "@angular/core";

import { PromisResult, MenuItem, AXTabPageService } from "acorex-ui";
import { AXNavMenuService } from "acorex-spa";
import { DemoPage } from "../../modules/demo/demo-page.component";
import { AliPage } from 'src/app/modules/demo/ali/ali.page';

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
      icon: "fas fa-tachometer-alt",
      id: "00",
      visible: true,
      data:{page:AliPage}
    },
    {
      name: "components_demo",
      text: "Components Demo",
      id: "0_0",
      visible: true,
      data: { page: DemoPage }
    },
    {
      name: "leads",
      text: "Leads",
      id: "0_1",
      parentId: "0",
      visible: true,
    },
    {
      name: "quotes",
      text: "Quotes",
      id: "0_2",
      parentId: "7_8",
      visible: true
    },
    {
      name: "sub-menu1",
      text: "Sub-Menu 1",
      id: "0_2_1",
      parentId: "0_2",
      visible: true
    },
    {
      name: "sub-menu2",
      text: "Sub-Menu 2",
      id: "0_2_2",
      parentId: "0_2",
      visible: true
    },
    {
      name: "sub-menu2",
      text: "Sub-Menu 2",
      id: "0_2_1_0",
      parentId: "0_2_1",
      visible: true
    },
    {
      name: "sub-menu2",
      text: "Sub-Menu Sub-Menu 2",
      id: "0_2_1_0_0",
      parentId: "0_2_1_0",
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
    // {
    //   name: "customers",
    //   text: "Customers",
    //   id: "1_1",
    //   parentId: "1",
    //   visible: true
    // },
    // {
    //   name: "suppliers",
    //   text: "Suppliers",
    //   id: "1_2",
    //   parentId: "1",
    //   visible: true
    // },
    // {
    //   name: "subcontractors",
    //   text: "Subcontractors",
    //   id: "1_3",
    //   parentId: "1",
    //   visible: true
    // },
    // {
    //   name: "staff",
    //   text: "Staff",
    //   id: "1_4",
    //   parentId: "1",
    //   visible: true
    // },
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
      name: "service A",
      text: "Service A",
      id: "2_2_1",
      parentId: "2_2",
      visible: true
    },
    {
      name: "service B",
      text: "Service B",
      id: "2_2_2",
      parentId: "2_2",
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
  private mockItemFarsi: MenuItem[] = [
    {
      name: "dashboard",
      text: "Dashboard",
      icon: "fas fa-tachometer-alt",
      id: "0",
      visible: true
    }
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
