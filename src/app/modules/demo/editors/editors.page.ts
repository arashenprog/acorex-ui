import { Component, OnInit } from "@angular/core";
import { AXBasePageComponent, MenuItem } from "acorex-ui";

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


  menuItems: MenuItem[] = [
    {
      name: "new",
      text: "new Item",
     
      icon: "fas fa-plus"
    },
    {
      name: "delete",
      text: "Delete",
      split: true,
      icon: "fas fa-trash"
    }
  ]



  selectedValues = 2;

  handleSelectedValuesChange(e) {
    console.log(e)
  }
}
