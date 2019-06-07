import { Component, OnInit } from "@angular/core";
import { MenuItem } from "acorex-ui";

@Component({
  selector: "task-detail",
  templateUrl: "./tasks-detail.page.html"
})
export class TaskDetailComponent implements OnInit {
  constructor() {}
  listToolbarItems: MenuItem[] = [
    {
      name: "members",
      text: "Members",
      style: "btn btn-light"
    },
    {
      name: "labels",
      text: "Labels",
      style: "btn btn-light"
    },
    {
      name: "checklist",
      text: "Checklist",
      style: "btn btn-light"
    },
    {
      name: "due_date",
      text: "Due Date",
      style: "btn btn-light"
    },
    {
      name: "attachment",
      text: "Attachment",
      style: "btn btn-light"
    }
  ];
  ngOnInit(): void {}
}
