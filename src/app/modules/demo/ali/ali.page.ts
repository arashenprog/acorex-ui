import { Component, OnInit } from "@angular/core";
import {
  AXBasePageComponent,
  PromisResult,
  AXHttpService,
  MenuItem
} from "acorex-ui";

@Component({
  selector: "ali-page",
  templateUrl: "./ali.page.html",
  styleUrls: ["./ali.page.scss"]
})
export class AliPage extends AXBasePageComponent {
  constructor(private http: AXHttpService) {
    super();
  }
  listToolbarItems: MenuItem[] = [
    {
      icon: "fas fa-users",
      name: "members",
      text: "Members",
      style: "btn btn-light"
    },
    {
      icon: "fas fa-paragraph",
      name: "description",
      text: "Description",
      style: "btn btn-light"
    },
    {
      icon: "fas fa-tags",

      name: "labels",
      text: "Labels",
      style: "btn btn-light"
    },
    {
      icon: "fas fa-layer-group",
      name: "tasks",
      text: "Tasks",
      style: "btn btn-light"
    },
    {
      icon: "fas fa-clock",
      name: "dueDate",
      text: "Due Date",
      style: "btn btn-light"
    },
    {
      icon: "fas fa-paperclip",
      name: "attachment",
      text: "Attachment",
      style: "btn btn-light"
    }
  ];
  ngOnInit(): void {}
  provideListData = () => {
    return new PromisResult(resolve => {
      this.http
        .get("https://jsonplaceholder.typicode.com/users", {})
        .result(c => {
          resolve((<any>c).slice(0, 8));
          console.log(c);
        });
    });
  };
}
