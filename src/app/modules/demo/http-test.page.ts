import { Component } from "@angular/core";
import {
  AXHttpService,
  AXBasePageComponent,
  PromisResult,
  MenuItem
} from "acorex-ui";

@Component({
  templateUrl: "./http-test.page.html"
})
export class TestHttpComponent extends AXBasePageComponent {
  constructor(private http: AXHttpService) {
    super();
  }
  test() {}
  //FixMe
  // provideData = (params: AXDataSourceReadParams) => {
  provideData = () => {
    return new PromisResult(resolve => {
      this.http
        .get("https://jsonplaceholder.typicode.com/todos", {})
        .result(c => {
          resolve(c);
          console.log(c);
        });
    });
  };
  toolbarItems: MenuItem[] = [
    {
      name: "vertical",
      text: "Vertical",
      icon: "fas fa-circle",
      type: "primary"
    },
    {
      name: "vertical-wrap",
      text: "Vertical Wrap",
      icon: "fas fa-circle",
      type: "primary"
    },
    {
      name: "horizontal",
      text: "Horizontal",
      icon: "fas fa-circle",
      type: "primary"
    },
    {
      name: "vertical",
      text: "Vertical",
      icon: "fas fa-circle",
      type: "primary"
    }
  ];
  
  layout: string = "vertical";

  onMenuItemClick(e) {
    switch (e.name) {
      case "vertical":
        this.layout == "vertical";
        break;
      case "vertical-wrap":
        this.layout == "vertical-wrap";
        break;
      case "horizontal":
        this.layout == "horizontal";
        break;
      case "horizontal-wrap":
        this.layout == "horizontal-wrap";
        break;
      default:
        console.log(e);
        break;
    }
  }
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

  onCellDbClick(e)
  {
    console.log("cell db click",e);
  }

  onSelectionChanged(e)
  {
    console.log(e);
  }

  onItemClick(e)
  {
    console.log("onItemClick",e);
  }
}
