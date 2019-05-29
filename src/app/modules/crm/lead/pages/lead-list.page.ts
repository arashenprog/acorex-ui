import { Component } from "@angular/core";
import { AXBasePageComponent, PromisResult, MenuItem, CheckItem } from "acorex-ui";
import { LeadService } from "../lead.service";

@Component({
  templateUrl: "./lead-list.page.html"
})
export class LeadListPage extends AXBasePageComponent {
  constructor(private lead: LeadService) {
    super();
  }

  gridItems: MenuItem[] = [
    {
      name: "insert",
      icon: "fas fa-sync",
      style: "btn btn-light text-info"
    }
  ];
  toolbarItemsRight: MenuItem[] = [
    {
      name: "leads",
      icon: "fas fa-user-alt",
      style: "btn btn-light text-secondary",
      text: "Leads"
    },
    {
      name: "scheduler",
      icon: "fas fa-calendar",
      style: "btn btn-light text-secondary",
      text: "Scheduler"
    },
    {
      name: "calendar",
      icon: "fas fa-calendar-alt",
      style: "btn btn-light text-secondary",
      text: "Calendar"
    },

  ];
  toolbarItemsLeft: MenuItem[] = [
    {
      name: "filter",
      icon: "fas fa-filter",
      style: "btn btn-light text-info",
      text: "Filter"
    },
    {
      name: "trello",
      icon: "fas fa-calendar",
      style: "btn btn-light text-primary",
      text: "Trello & SMS Delivery"
    }
  ];
  nextAction: CheckItem[] = [
    {
      text: "First Contact",
      value: false
    },
    {
      text: "Waiting for visit",
      value: false
    },
    {
      text: "Determine Product / Service",
      value: false
    },
    {
      text: "Measure Size",
      value: false
    }
  ];
  staff: CheckItem[] = [
    {
      text: "Sam",
      value: false
    },
    {
      text: "Fred",
      value: false
    },
    {
      text: "Kia",
      value: false
    },
    {
      text: "Tar",
      value: false
    },
    {
      text: "Alex",
      value: false
    }
  ];
  dates: CheckItem[] = [
    {
      text: "Today",
      value: false
    },
    {
      text: "This Week",
      value: false
    },
    {
      text: "Last Week",
      value: false
    },
    {
      text: "Last 2 Week",
      value: false
    },
    {
      text: "This Month",
      value: false
    },
    {
      text: "Last 2 Month",
      value: false
    },
    {
      text: "Yesterday",
      value: false
    },
    {
      text: "Last 7 Days",
      value: false
    }, {
      text: "Last 14 Days",
      value: false
    }, {
      text: "Last 30 Days",
      value: false
    }, {
      text: "Last 60 Days",
      value: false
    },
    {
      text: "Custom",
      value: false
    }
  ];

  provideData = () => {
    return this.lead.getList();
  };

  commandItems: MenuItem[] = [
    {
      name: "01",
      type: "success",
      icon: "fas fa-check text-primary"
    },
    {
      name: "02",
      type: "danger",
      icon: "fas fa-pen text-danger"
    }
  ];

  onCellDbClick(e) {
    console.log("cell db click", e);
  }

  onSelectionChanged(e) {
    console.log(e);
  }

  onItemClick(e) {
    console.log("onItemClick", e);
  }

  showFilter: boolean = true;
  onItemMenuLeftClick(e) {
    console.log(e)
    switch (e.name) {
      case "trello":
        this.showFilter = false

        break;
      case "filter":
        this.showFilter = true
        break;
      default:
        break;
    }

  }
  showLeads: boolean = true;
  showScheduler: boolean = false;
  showCalendar: boolean = false;

  onItemMenuRightClick(e) {
    switch (e.name) {
      case "scheduler":
        this.showScheduler = true;
        this.showCalendar = false;
        this.showLeads = false;
        break;
      case "calendar":
        this.showCalendar = true;
        this.showLeads = false;
        this.showScheduler = false;
        break;
      case "leads":
        this.showLeads = true
        this.showScheduler = false
        this.showCalendar = false

        break;
      default:
        break;
    }
  }
}
