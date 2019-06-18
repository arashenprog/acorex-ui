import { Component, ContentChildren, QueryList, ViewEncapsulation, Host, HostListener, Input, Output, EventEmitter, Attribute } from '@angular/core';
import * as GoldenLayout from 'golden-layout';
import { AXDockPanelComponent } from './dock-panel.component';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
declare var $: any;

export class AXDockLayoutState {
  storageKey: string;
  json: string;
}

@Component({
  selector: 'ax-dock-layout',
  template: '<div id="{{uid}}" class="layoutContainer"></div>',
  styleUrls: ['./dock-layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AXDockLayoutComponent {
  @ContentChildren(AXDockPanelComponent)
  private panel: QueryList<AXDockPanelComponent>;
  private config: any;
  private layout: any;
  uid = "dock-" + Math.floor(Math.random() * 100000000);

  @Output()
  onSave: EventEmitter<AXDockLayoutState> = new EventEmitter<AXDockLayoutState>();




  constructor(
    @Attribute("storageKey") public storageKey: string,
    @Attribute("autoSave") public autoSave: boolean = true,
  ) {
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
    this.loadLayout();
    let that = this;
    // this.layout.on('stateChanged', function (e) {
    //   debugger;
    //   if (that.autoSave)
    //     that.saveLayout();
    // });
  }

  saveLayout(): void {
    let replacer = (name, val) => {
      if (name === 'componentState') {
        return undefined;
      } else {
        return val;
      }
    };
    //if (this.layout.isInitialised) {
      let json = JSON.stringify(this.layout.toConfig(), replacer);
      this.onSave.emit({ storageKey: this.storageKey, json: json })
    //}
  }

  loadLayout(json?: any) {
    this.panel.forEach(p => {
      this.config.content.push(p.config());
    });
    let state = null;
    try {
      if (json)
        state = JSON.parse(json);
    } catch (error) {
      console.error(error);
    }
    if (state) {
      try {
        let list1: any[] = [];
        this.findComponents(this.config.content, list1);
        let list2: any[] = [];
        if (state && state.content) {
          this.findComponents(state.content, list2);
          list2.forEach(l2 => {
            let l1 = list1.find(c => c.title == l2.title);
            if (l1 && l1.componentState) {
              l2.componentState = l1.componentState;
            }
            else {
              l2.removed = true;
            }
          });
          this.clearRemoved(state.content);
          this.config = state;
        }
      } catch (error) {
        console.error(error);
      }
    }
    this.render();
  }

  private clearRemoved(state: any[]) {
    state.forEach(e => {
      // if (e.type == "component")
      //   output.push(e);
      // if (e.content) {
      //   this.findComponents(e.content, output);
      // }
    });
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
    this.layout = new GoldenLayout(this.config, $('#' + this.uid));
    this.layout.registerComponent('component', function (container, state) {
      if (state && state.render)
        state.render(container.getElement());
    });

    this.layout.init();
  }

  private resizeChangeObserver: any;
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (!this.resizeChangeObserver) {
      Observable.create(observer => {
        this.resizeChangeObserver = observer;
      })
        .pipe(debounceTime(500))
        .pipe(distinctUntilChanged())
        .subscribe(c => {
          this.layout.updateSize();
        });
    }
    this.resizeChangeObserver.next(event);
  }
}
