import { Component, OnInit } from "@angular/core";
import { AXBasePageComponent } from "acorex-ui";

@Component({
  templateUrl: "./editors.page.html"
})
export class EditorsPage extends AXBasePageComponent {
  constructor() {
    super();
  }

  items: any[] = []

  ngOnInit(): void {

    for (let i = 0; i < 50; i++) {
      this.items.push(
        {
          value: i,
          text: "Items " + i,
        })

    }
  }



  selectedValues = 2;

  handleSelectedValuesChange(e) {
    console.log(e)
  }
}
