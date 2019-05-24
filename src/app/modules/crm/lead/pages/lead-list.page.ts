import { Component } from "@angular/core";
import {
  AXBasePageComponent,
  PromisResult,
  MenuItem
} from "acorex-ui";
import { LeadService } from '../lead.service';

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
      icon: "fas fa-plus-square",
      type: "success",
      items: [
        {
          id: "s1",
          text: "فرم جدید",
        },
        {
          id: "s2",
          text: "صفحه جدید",
        },
        {
          id: "s3",
          text: "ارسال داده",
        }
      ]
    }
  ]

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
