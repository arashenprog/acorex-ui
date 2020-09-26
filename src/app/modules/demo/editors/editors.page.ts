import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from "@angular/core";
import { AXBasePageComponent, MenuItem, AXPopupService } from "acorex-ui";

@Component({
  templateUrl: "./editors.page.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorsPage extends AXBasePageComponent {
  constructor(private popupService: AXPopupService, private cdr: ChangeDetectorRef) {
    super();
  }

  items: any[] = []
  isLoading: boolean = false;

  ngOnInit(): void {
    this.isLoading = true;
    setTimeout(() => {
      for (let i = 0; i < 1000; i++) {
        this.items.push(
          {
            value: i,
            text: "Items " + i,
          })

      }
      this.isLoading = false;
    }, 5000);
    this.selectedItems = [{
      value: 10,
      text: "Item 10"
    }];
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
  selectedItems = [{
    value: 3,
    text: "Item 3"
  }];

  handleSelectedValuesChange(e) {
    console.log(e)
  }

  showPopup() {
    this.popupService.open(EditorsPage, {
      title: "test",
      size: "lg"
    });
  }

  onOpen()
  {
  }
}
