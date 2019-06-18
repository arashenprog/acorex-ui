import { Component, OnInit, ViewChild } from "@angular/core";
import {
  AXBasePageComponent,
  PromisResult,
  AXHttpService,
  MenuItem,
  AXDockLayoutComponent
} from "acorex-ui";

@Component({
  selector: "ali-page",
  templateUrl: "./ali.page.html",
  styleUrls: ["./ali.page.scss"]
})
export class AliPage extends AXBasePageComponent {

  @ViewChild("layout") layout: AXDockLayoutComponent;
  
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

  onLayoutSave(e) {
    console.log("Layout saved:"+e.storageKey)
    localStorage.setItem(e.storageKey, e.json);
  }

 ngAfterViewInit(): void {
  console.log("Layout loaded:"+this.layout.storageKey)
  this.loadLayout(this.layout.storageKey);
   
 }

  private loadLayout(key: string) {
    let layoutJson = localStorage.getItem(key);
    if (layoutJson) this.layout.loadLayout(layoutJson);
  }
}
