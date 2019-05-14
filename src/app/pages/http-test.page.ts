import { Component, OnInit, ViewChild } from "@angular/core";
import {
  IValidationRuleResult,
  DialogService,
  AXPopupService,
  AXToastService,
  AXHttpService,
  AXValidationFormComponent,
  AXTabPageService,
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
        this.http.post("https://jsonplaceholder.typicodes.com/todos", {
          params: { name: "arash" }
        })
          .result(c => {
            console.log(c);
          }).complete(() => {
            console.log("complete");
          })
      }
    
}
