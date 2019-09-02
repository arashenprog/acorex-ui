import { Component, ContentChildren, QueryList, ViewEncapsulation, Host, HostListener, Input, Output, EventEmitter, Attribute, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import * as GoldenLayout from 'golden-layout';
import { AXDockPanelComponent } from './dock-panel.component';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { NgZone } from '@angular/core';
declare var $: any;

export class AXDockLayoutState {
  storageKey: string;
  json: string;
}

@Component({
  selector: 'ax-dock-layout',
  template: '<div id="{{uid}}" class="layoutContainer"></div>',
  styleUrls: ['./dock-layout.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
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
    private cdr: ChangeDetectorRef,
    private zone: NgZone
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
    this.cdr.detach();
  }

  private bindEvent(): void {
    let that = this;
    this.layout.on('stateChanged', function (e) {
      that.saveLayout();
    });
  }

  private saveChangeObserver: any;
  saveLayout(): void {
    let replacer = (name, val) => {
      if (name === 'componentState') {
        return undefined;
      } else {
        return val;
      }
    };
    if (this.layout.isInitialised) {
      if (!this.saveChangeObserver) {
        Observable.create(observer => {
          this.saveChangeObserver = observer;
        })
          .pipe(debounceTime(1000))
          .pipe(distinctUntilChanged())
          .subscribe(c => {
            let json = JSON.stringify(this.layout.toConfig(), replacer);
            this.onSave.emit({ storageKey: this.storageKey, json: json })
          });
      }
      this.saveChangeObserver.next(new Date().getTime());
    }
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
          });
          state = this.dropRemoved(state)
          this.config = state;
        }
      } catch (error) {
        console.error(error);
      }
    }
    this.render();
  }

  private dropRemoved(input: any): any {
    input.content = input.content.filter(c => c.componentState || c.content);
    if (input.activeItemIndex && input.activeItemIndex >= input.content.length) {
      input.activeItemIndex = 0;
    }
    input.content.forEach(e => {
      if (e.content) {
        e = this.dropRemoved(e);
      }
    });
    return input;
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
    if (this.layout) {
      this.layout.destroy();
    }
    this.layout = new GoldenLayout(this.config, $('#' + this.uid));
    this.bindEvent();
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
          this.applyResize();
        });
    }
    this.resizeChangeObserver.next(event);
  }


  applyResize() {
    this.zone.runOutsideAngular(() => {
      if (this.layout) {
        this.layout.updateSize();
      }
    })
  }

  ngDoCheck(): void {
    this.applyResize();
  }
}
