import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "acorex-framework";
  menuItems: Array<any> = [
    { text: "گزینه 1" },
    { text: "گزینه 2" },
    { text: "گزینه 3" },
    { text: "گزینه 4" },
    { text: "گزینه 5" }
  ];

  check_box_items_inline: Array<any> = [
    {
      value: 1,
      text: "گزینه اول",
      name: "onei"
    },
    {
      value: 2,
      text: "گزینه دوم",
      name: "twoi"
    },
    {
      value: 3,
      text: "گزینه سوم",
      name: "threei"
    },
    {
      value: 4,
      text: "گزینه چهارم",
      name: "fouri"
    },
    {
      value: 5,
      text: "گزینه پنجم",
      name: "fivei"
    }
  ];
}
