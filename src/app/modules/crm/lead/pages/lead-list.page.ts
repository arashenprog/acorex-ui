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
  toolbarItems: MenuItem[] = [
    {
      name: "insert",
      icon: "fas fa-plus-circle",
      style: "btn btn-light text-success",
      text: "Add"
    },
    {
      name: "update",
      icon: "fas fa-pencil-alt",
      style: "btn btn-light text-primary",
      text: "Edit"
    },
    {
      name: "refresh",
      icon: "fas fa-sync",
      style: "btn btn-light text-info",
      text: "Refresh"
    },
    {
      name: "delete",
      icon: "fas fa-trash-alt",
      style: "btn btn-light text-danger",
      text: "Delete"
    },
    {
      id: "m1",
      text: "More Options",
      icon: "fas fa-plus-square",
      style: "btn btn-light text-success",
      items: [
        {
          id: "s1",
          text: "New form",
          icon: "fas fa-plus-square"
        },
        {
          id: "s2",
          text: "New page",
          icon: "fas fa-plus-square"
        },
        {
          id: "s3",
          text: "Send data",
          icon: "fas fa-tachometer-alt",

          items: [
            {
              icon: "fas fa-tachometer-alt",
              text: "child s3",
              items: [
                {
                  icon: "fas fa-tachometer-alt",
                  text: "child s33"
                },
                {
                  icon: "fas fa-tachometer-alt",
                  text: "child s33"
                }
              ]
            },
            {
              icon: "fas fa-tachometer-alt",
              text: "child s3"
            },
            {
              icon: "fas fa-tachometer-alt",

              text: "child s3"
            }
          ]
        }
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
}
