import { Component} from "@angular/core";
import {
  AXHttpService,
  AXBasePageComponent
} from "acorex-ui";

@Component({
  templateUrl: "./http-test.page.html"
})
export class TestHttpComponent  extends AXBasePageComponent {
    constructor(
        private http: AXHttpService
      ) { 
          super();
      }
      test() {
        this.http.get("https://jsonplaceholder.typicode.com/todos", {
          params: { name: "arash" }
        })
          .result(c => {
            console.log(c);
          })
      }
    
}
