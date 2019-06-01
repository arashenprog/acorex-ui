import { Component, ContentChildren, QueryList, ViewEncapsulation, Host, HostListener } from '@angular/core';
import * as GoldenLayout from 'golden-layout';
import { AXDockPanelComponent } from './dock-panel.component';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
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

  constructor() {


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
    let that = this;
    this.layout.on('stateChanged', function (e) {
      that.saveState();
    });
  }

  saveState(): void {
    let replacer = (name, val) => {
      if (name === 'componentState') {
        return undefined;
      } else {
        return val;
      }
    };
    if (this.layout.isInitialised) {
      var state = JSON.stringify(this.layout.toConfig(), replacer);
      localStorage.setItem('savedState', state);
    }
  }

  loadState() {
    this.panel.forEach(p => {
      this.config.content.push(p.config());
    });
    if (localStorage.getItem("savedState")) {
      try {
        let list1: any[] = [];
        this.findComponents(this.config.content, list1);
        let old = JSON.parse(localStorage.getItem("savedState"));
        let list2: any[] = [];
        if (old) {
          this.findComponents(old.content, list2);
          list2.forEach(l2 => {
            let l1 = list1.find(c => c.title == l2.title);
            if (l1 && l1.componentState) {
              l2.componentState = l1.componentState;
            }
          });
          this.config = old;
        }
      } catch (error) {
        console.error(error);
      }
    }
    this.render();
  }

  private findComponents(input: any[], output: any[]) {
    input.forEach(e => {
      if (e.type == "component")
        output.push(e);
      if (e.content) {
        this.findComponents(e.content, output);
      }
    });
  }

  private render() {
    if (this.layout)
      this.layout.destroy();
    this.layout = new GoldenLayout(this.config, $('#layoutContainer'));
    this.layout.registerComponent('component', function (container, state) {
      state.render(container.getElement());
    });

    this.layout.init();
  }

  private resizeChangeObserver: any;
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    console.log("resize");
    if (!this.resizeChangeObserver) {
      Observable.create(observer => {
        this.resizeChangeObserver = observer;
      })
        .pipe(debounceTime(500))
        .pipe(distinctUntilChanged())
        .subscribe(c => {
          console.log("resize rx");
          this.layout.updateSize();
        });
    }
    this.resizeChangeObserver.next(event);
  }



}
