import { Component, OnInit } from "@angular/core";
import { AXBasePageComponent } from "acorex-ui";

@Component({
  templateUrl: "./editors.page.html"
})
export class EditorsPage extends AXBasePageComponent {
  constructor() {
    super();
  }
  value = "100"
  minValue = 5;
  maxValue = 200;
  ngOnInit(): void { }

  onValueChanged(e) {
    console.log('1', e)
  }
  valueChange(e) {
    console.log('2', e)
  }
  decimalNumber = 2;
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

  selectedValues = [];

  handleSelectedValuesChange(e) {
    debugger;
  }
}
