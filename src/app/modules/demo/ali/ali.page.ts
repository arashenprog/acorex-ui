import { Component, OnInit, ViewChild } from "@angular/core";
import {
  AXBasePageComponent,
  PromisResult,
  AXHttpService,
  MenuItem,
  AXDateTime,
  AXDateTimeRange,
  AXDockLayoutComponent,
  AXSchedulerEvent
} from "acorex-ui";

@Component({
  selector: "ali-page",
  templateUrl: "./ali.page.html",
  styleUrls: ["./ali.page.scss"]
})
export class AliPage extends AXBasePageComponent {

  view: string = "week";

  listToolbarItems: MenuItem[] = [
    {
      icon: "fas fa-chart-line",
      name: "item1",
      text: "Line Chart",
      groupName: "mode",
    },
    {
      icon: "fas fa-chart-pie",
      name: "item2",
      selected: true,
      text: "Pie CHart",
      groupName: "mode",
    },
    {
      icon: "fas fa-chart-area",
      name: "item3",
      selected: true,
      groupName: "mode2",
    },
    {
      icon: "fas fa-chart-area",
      name: "item4",
      groupName: "mode2",
    }
  ]

  verMenuItems: MenuItem[] = [
    {
      icon: "fas fa-chart-line",
      name: "item1",
      text: "Line Chart",
    },
    {
      icon: "fas fa-chart-pie",
      name: "item2",
      text: "Pie CHart",
      items: [
        {
          name: "item3",
          text: "Item 3",
        },
        {
          name: "item4",
          text: "Item 4",
          items: [
            {
              name: "item5",
              text: "Item 5",
            },
            {
              name: "item6",
              text: "Item 6",
            }
          ]
        }
      ]
    }
  ]

  data: AXSchedulerEvent[] = [
    {
      range: new AXDateTimeRange(new AXDateTime("2019-06-05 19:30"), new AXDateTime("2019-06-05 22:30")),
      title: "Birds Of Pray",
      uid: "e1",
      color: "rgb(127, 169, 0)"
    },
    {
      range: new AXDateTimeRange(new AXDateTime("2019-06-13 08:30"), new AXDateTime("2019-06-14 12:30")),
      title: "Play Day",
      uid: "e2",
      color: "rgb(26, 170, 85)"
    },
    {
      range: new AXDateTimeRange(new AXDateTime("2019-06-18 12:30"), new AXDateTime("2019-06-19 14:00")),
      title: "Halloween party",
      uid: "e3",
      color: "rgb(245, 127, 23)"
    },
    {
      range: new AXDateTimeRange(new AXDateTime("2019-06-29 08:30"), new AXDateTime("2019-06-29 09:30")),
      title: "Face Painting & Drawing events",
      uid: "e4",
      color: "rgb(53, 124, 210)"
    },
    {
      range: new AXDateTimeRange(new AXDateTime("2019-06-29 08:30"), new AXDateTime("2019-06-29 12:30")),
      title: "Pony rides",
      uid: "e5",
      color: "rgb(53, 124, 108)"
    },
    {
      range: new AXDateTimeRange(new AXDateTime("2019-07-05 08:30:00"), new AXDateTime("2019-07-05 15:00:00")),
      title: "Arash's Birthday",
      uid: "e6",
      color: "rgb(53, 124, 210)"
    },
    {
      range: new AXDateTimeRange(new AXDateTime("2019-07-07 07:00:00"), new AXDateTime("2019-07-10 08:30:00")),
      title: "Los Angeles to Barcelona",
      uid: "e7",
      color: "rgb(26, 170, 85)"
    },
  ]

  onEventChanged(e) {
    e.complete();
  }

  provideGridData = (e) => {
    debugger;
    return new PromisResult(resolve => {
      if (e && e.searchText) {
        let rs = this.data.filter(c => c.title.toLowerCase().includes(e.searchText));
        resolve(rs);
      }
      else {
        resolve(this.data);
      }
    });
  };

}
