import { Component, OnInit } from '@angular/core';
import { AXWidgetService, IWidget } from './widget.service';
import { AXBasePageComponent } from '../../nav/api';

@Component({
  selector: 'app-widget-picker',
  templateUrl: './widget-picker.page.html',
  styleUrls: ['./widget-picker.page.scss']
})
export class AXWidgetPickerPage extends AXBasePageComponent  {

  constructor(
    public widgetService: AXWidgetService
  ) {
    super();
  }


  addWidget(widget: IWidget) {
    this.close(widget);
  }

}
