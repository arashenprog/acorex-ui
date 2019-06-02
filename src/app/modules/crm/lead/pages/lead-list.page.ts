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
<<<<<<< HEAD
      icon: "fas fa-table",
      style: "btn btn-success",
      text: "Layout",
      items: [
        {
          text: "Save",
          name: "save",
        },
        {
          text: "Save As",
          name: "saveAs",
        },
        {
          text: "Reset",
          name: "reset"
        }
        // ,
        // {
        //   text: "Open",
        //   // items: [
        //   //   {
        //   //     text: "Layout1"
        //   //   },
        //   //   {
        //   //     text: "Layout2"
        //   //   },
        //   //   ,
        //   //   {
        //   //     text: "Layout3"
        //   //   }
        //   // ]
        // }
=======
      name: "reset",
      icon: "fas fa-sync",
      style: "btn btn-warning",
    },
    {
      name: "edit",
      icon: "fas fa-pen",
      text:"Layout",
      style: "btn btn-primary",
      items: [
        {
          text: "s1"
        },
        {
          text: "s2"
        },
        {
          text: "s3"
        },
        {
          text: "s4"
        },
        {
          text: "s5",
          items: [
            {
              text: "s1"
            },
            {
              text: "s2"
            },
            {
              text: "s3"
            },
            {
              text: "s4"
            },
            {
              text: "s5"
            }
          ]
        }
>>>>>>> 9db45b3ed5da3ad8576c88b1b433f50420fff5f5
      ]
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

  showFilter: boolean = true;
  onItemMenuLeftClick(e) {
    console.log(e);
    switch (e.name) {
      case "trello":
        this.showFilter = false;

        break;
      case "filter":
        this.showFilter = true;
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
    this.toast.success("Layout saved successfully.")
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
