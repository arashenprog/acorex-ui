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
        showMaximiseIcon: true,
        showCloseIcon: false
      },
      content: []
    };

  }

  ngAfterViewInit(): void {

    this.loadState();
  }

  saveState(): void {
    let replacer = (name, val) => {
      if (name === 'componentState') {
        return undefined;
      } else {
        return val;
      }
    };
    var state = JSON.stringify(this.layout.toConfig(), replacer);
    console.log(state)
    localStorage.setItem('savedState', state);
  }

  loadState() {
    this.panel.forEach(p => {
      this.config.content.push(p.config());
    });
    if (localStorage.getItem("savedState")) {
      try {
        debugger;
        let list1: any[] = [];
        this.findComponents(this.config, list1);
        let old = JSON.parse(localStorage.getItem("savedState"));
        let list2: any[] = [];
        this.findComponents(old, list2);

        console.log(list1, list2);

        //this.config = old;
      } catch (error) {
        console.log(error);
      }
    }

    this.render();
  }

  private findComponents(input: any, output: any[]) {
    for (const key in input) {
      if (input.hasOwnProperty(key)) {
        const e = input[key];
        if (key == "content" && e) {
          e.forEach(c => {
            if (c.type == "component")
              output.push(c);
          });
        }
        this.findComponents(e, output);
      }
    }
    // input.forEach(e => {
    //   if (e.componentName == "component")
    //     output.push(e);
    //   if (e.content) {
    //     this.findComponents(e.content, output);
    //   }
    // });
  }

  private render() {
    this.layout = new GoldenLayout(this.config, $('#layoutContainer'));
    this.layout.registerComponent('component', function (container, state) {
      state.render(container.getElement());
    });
    let that = this;
    this.layout.on('stateChanged', function (e) {
      that.saveState();
    });
    this.layout.init();
  }





}
