import { Component, OnInit } from "@angular/core";
import { AXBasePageComponent } from "acorex-ui";

@Component({
  templateUrl: "./editors.page.html"
})
export class EditorsPage extends AXBasePageComponent {
  constructor() {
    super();
  }

  ngOnInit(): void { }


  items = [
    {
      value: 1,
      text: "Items 1",
    },
    {
      value: 2,
      text: "Items 2",
    },
    {
      value: 3,
      text: "Items 3",
    },
  ]

  selectedValues=[];

  handleSelectedValuesChange(e)
  {
    debugger;
  }
}
