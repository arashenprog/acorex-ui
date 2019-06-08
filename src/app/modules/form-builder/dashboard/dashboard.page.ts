import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AXBasePageComponent, MenuItem } from 'acorex-ui';
import { text } from '@angular/core/src/render3';

@Component({
  selector: 'dashboard-page',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardPage extends AXBasePageComponent {
  toolbarItemsRight: MenuItem[] = [
    {
      icon: "fas fa-pen",
      style: "btn btn-success",
      text: "ایجاد"
    },
    {
      icon: "fas fa-sync",
      style: "btn btn-info",
      name: "reset",
      text: "بروزرسانی"
    }
  ];
  cardItems: any[] = [
    {
      title: "عنوان شماره یک",
      image: "assets/images/form.jpg",
      url: "#1"
    },
    {
      title: "عنوان شماره دو",
      image: "assets/images/form.jpg",
      url: "#2"
    },
    {
      title: "عنوان شماره سه",
      image: "assets/images/form.jpg",
      url: "#2"
    }
  ]
  onSearch(text) {
    let filtred = this.cardItems.filter((c)=>{
      return c.title == text
    })
    console.log(filtred,text)
  }
}
