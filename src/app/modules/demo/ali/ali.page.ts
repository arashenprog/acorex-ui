import { Component, OnInit, ViewChild } from "@angular/core";
import {
  AXBasePageComponent,
  PromisResult,
  AXHttpService,
  MenuItem,
  AXDockLayoutComponent
} from "acorex-ui";

@Component({
  selector: "ali-page",
  templateUrl: "./ali.page.html",
  styleUrls: ["./ali.page.scss"]
})
export class AliPage extends AXBasePageComponent {

  listToolbarItems:MenuItem[]=[
    {
      icon:"fas fa-chart-line",
      name:"item1",
      text:"Line Chart",
      groupName:"mode",
    },
    {
      icon:"fas fa-chart-pie",
      name:"item2",
      selected:true,
      text:"Pie CHart",
      groupName:"mode",
    },
    {
      icon:"fas fa-chart-area",
      name:"item3",
      selected:true,
      groupName:"mode2",
    },
    {
      icon:"fas fa-chart-area",
      name:"item4",
      groupName:"mode2",
    }
  ]
 
}
