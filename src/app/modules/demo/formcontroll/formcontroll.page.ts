import { Component, OnInit } from '@angular/core';
import { AXBasePageComponent, CheckItem } from 'acorex-ui';

@Component({
  templateUrl: "./formcontroll.page.html"
})
export class FormControllPage extends AXBasePageComponent{
  check: boolean;

  constructor() {
      super()
  }

  ngOnInit(): void {}
  valueChange(val){
      this.check = val;
  }


  radioSelectedItems:any[]=[];
  checkSelectedItems:any[]=[];

  items:CheckItem[] = [
    {
      text:"item 1",
      value : "1"
    },
    {
      text:"item 2",
      value : "2"
    },
    {
      text:"item 3",
      value : "3"
    }
  ]

  items2:CheckItem[] = [
    {
      text:"item 1",
      value : "1"
    },
    {
      text:"item 2",
      value : "2"
    },
    {
      text:"item 3",
      value : "3"
    }
  ]

  ngAfterViewInit(): void {
    this.radioSelectedItems.push(this.items[1]);
    this.checkSelectedItems.push(this.items2[0]);
    this.checkSelectedItems.push(this.items2[2]);
  }
}
