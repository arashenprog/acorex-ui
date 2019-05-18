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

  commandItems: MenuItem[] = [
    {
      name: "01",
      text: "Send",
      type:"success",
      icon:"fas fa-check"
    },
    {
      name: "02",
      text: "Cancel",
      type:"danger"
    }
  ];
}
