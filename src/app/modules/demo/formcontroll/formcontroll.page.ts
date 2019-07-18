import { Component, OnInit } from '@angular/core';
import { AXBasePageComponent } from 'acorex-ui';

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
}
