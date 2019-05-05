import { Component, Renderer } from "@angular/core";
import { MenuItem } from "acorex-ui";


@Component({
  selector: "ax-side-menu",
  templateUrl: "./sidemenu.layout.html"
})
export class AXSideMenuComponent {

  searchText: string;

  constructor() {
  
  }

  get items(): MenuItem[] {
    if (this.searchText) {
      return this.search(this.searchText);
    }
    else {
      if (this.favoriteCheck)
        return this.favoriteItems;
      else
        return this.allItems;
    }
  }

  favoriteItems: MenuItem[] = [
    {
      id: "121",
      text: "ساب ساب 1",
      items: []
    },
    {
      id: "122",
      text: "ساب ساب 2",
      items: []
    },
  ]



  allItems: MenuItem[] = [
    {
      id: "1",
      text: "رووت 1",
      icon: "fas fa-store-alt",
      items: [
        {
          id: "11",
          text: "ساب 1"
        },
        {
          id: "12",
          text: "ساب 2",
          items: [
            {
              id: "121",
              text: "ساب ساب 1",
              type: "form"
            },
          ]
        },
      ]
    },
    {
      id: "2",
      text: "رووت 2",
      icon: "fas fa-archive"
    },
    {
      id: "3",
      text: "رووت 3",
      icon: "fas fa-book"

    },
    {
      id: "4",
      text: "رووت 4",
      icon: "fas fa-suitcase"

    },
    {
      id: "5",
      text: "رووت 5",
      icon: "fas fa-chart-pie"

    },
  ]


  private search(text: string): MenuItem[] {
    let result = new Array<MenuItem>();
    this.applySearch(text, this.allItems, result);
    return result;
  }

  private applySearch(text: string, items: MenuItem[], result: MenuItem[]): void {
    if (items && items.length) {
      let found = items.filter(c => c.text.indexOf(text) >= 0 && c.type == "form");
      found.forEach(d => {
        if (!result.find(z => z.id == d.id))
          result.push(d);
      });
      items.forEach(i => {
        this.applySearch(text, i.items, result);
      });
    }
  }

  favoriteCheck: boolean = false;
  onFavoriteClick(e) {
    this.favoriteCheck = !this.favoriteCheck;
  }


  onSearch(e) {

  }



}
