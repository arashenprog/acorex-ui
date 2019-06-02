import { Component, ViewChild } from "@angular/core";
import {
  AXBasePageComponent,
  PromisResult,
  MenuItem,
  CheckItem,
  AXToastService
} from "acorex-ui";
import { LeadService } from "../lead.service";
import { addHours, startOfDay } from "date-fns";
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent
} from "angular-calendar";
import { AXDockLayoutComponent } from 'acorex-ui';

const users = [
  {
    id: 0,
    name: "John smith",
    color: {
      primary: "var(--warning-color)",
      secondary: "var(--warning-light-color)"
    }
  },
  {
    id: 1,
    name: "Jane Doe",
    color: {
      primary: "var(--primary-color)",
      secondary: "var(--primary-light-color)"
    }
  }
];

@Component({
  templateUrl: "./lead-list.page.html"
})
export class LeadListPage extends AXBasePageComponent {
  constructor(private lead: LeadService, private toast: AXToastService) {
    super();
  }


  @ViewChild('layout') layout: AXDockLayoutComponent;

  gridItems: MenuItem[] = [
    {
      name: "insert",
      icon: "fas fa-sync",
      style: "btn btn-light text-info"
    }
  ];
  toolbarItemsRight: MenuItem[] = [
    {
      icon: "fas fa-table",
      style: "btn btn-success",
      text: "Layout",
      items: [
        {
          text: "Layout1",
          name: "L1",
        },
        {
          text: "Layout2",
          name: "L2",
        }
        ,
        {
          text: "Layout3",
          name: "L3",
        }
      ]
    },
    {
      icon: "fas fa-save",
      style: "btn btn-primary",
      items: [
        {
          text: "Save",
          name: "save",
        },
        {
          text: "Save As",
          name: "saveAs",
        }
      ]
    },
    {
      icon: "fas fa-sync",
      style: "btn btn-warning",
      name: "reset"
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
    },
    {
      text: "Last 14 Days",
      value: false
    },
    {
      text: "Last 30 Days",
      value: false
    },
    {
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
  provideTaskData = () => {
    return this.lead.getTasks();
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


  onItemMenuRightClick(e) {
    switch (e.name) {
      case "save":
        this.layout.saveLayout();

        break;
      case "reset": {
        this.loadLayout();
        break
      }
      default:
        break;
    }
  }

  onLayoutSave(e) {
    console.log("save layout")
    localStorage.setItem("LAYOUT", e.json);
    this.toast.success("Saved Successfully!",{ 
      title:"Layout"
    })
  }

  ngAfterViewInit() {
    this.loadLayout();
  }

  private loadLayout() {
    let layoutJson = localStorage.getItem("LAYOUT");
    if (layoutJson)
      this.layout.loadLayout(layoutJson);
  }

  viewDate: Date = new Date();

  events: CalendarEvent[] = [
    {
      title: "An event",
      color: users[0].color,
      start: addHours(startOfDay(new Date()), 5),
      meta: {
        user: users[0]
      },
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    },
    {
      title: "Another event",
      color: users[1].color,
      start: addHours(startOfDay(new Date()), 2),
      meta: {
        user: users[1]
      },
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    },
    {
      title: "An 3rd event",
      color: users[0].color,
      start: addHours(startOfDay(new Date()), 7),
      meta: {
        user: users[0]
      },
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    }
  ];
}
