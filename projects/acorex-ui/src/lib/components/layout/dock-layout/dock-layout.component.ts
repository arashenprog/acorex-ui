import { Component, ElementRef, ViewContainerRef, ContentChildren, QueryList, ViewEncapsulation } from '@angular/core';
import * as GoldenLayout from 'golden-layout';
import { AXDockPanelComponent } from './dock-panel.component';
declare var $: any;


@Component({
  selector: 'ax-dock-layout',
  templateUrl: './dock-layout.component.html',
  styleUrls: ['./dock-layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AXDockLayoutComponent {


  @ContentChildren(AXDockPanelComponent)
  private panel: QueryList<AXDockPanelComponent>;
  private config: any;
  private layout: any;

  constructor(
    private el: ElementRef,
    private viewContainer: ViewContainerRef) {


    this.config = {
      settings: {
        hasHeaders: true,
        showPopoutIcon: false,
        showMaximiseIcon: false,
        showCloseIcon: false
      },
      content: []
    };

  }

  ngAfterViewInit(): void {
    this.panel.forEach(p => {
      this.config.content.push(p.config());
    });
    let THAT= this;
    this.layout = new GoldenLayout(this.config, $('#layoutContainer'));
    this.layout.registerComponent('component', function (container, state) {
      container.getElement().html('<h2>' + state.text + '</h2>');
      //container.getElement().html(state.component);
      //state.render(container.getElement());
      console.log(THAT.config);
    });
    this.layout.init();
  }



}