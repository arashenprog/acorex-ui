import {
  Component,
  OnInit,
  ContentChild,
  Input,
  ViewEncapsulation,
  ElementRef,
  ViewChild,
  ViewContainerRef
} from "@angular/core";
import { AXSchedulerViewsProperty } from "./scheduler-views.property";
import { AXToolbarSchedulerViewsComponent } from "./toolbars/scheduler-toolbar-views";
import { MenuItem } from "../../../core/menu.class";
import { AXToolbarComponent } from "../../layout/toolbar/toolbar.component";

import { AXSchedulerDayTimeViewComponent } from "./views/scheduler-day-time-view.component";
import { AXSchedulerMonthViewComponent } from "./views/scheduler-month-view.component";
import { InjectionService } from "../../../core/injection.service";



@Component({
  selector: "ax-scheduler",
  templateUrl: "./scheduler.component.html",
  styleUrls: ["./scheduler.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class AXSchedulerComponent implements OnInit {
  constructor(private elm: ElementRef<HTMLDivElement>,
    private injector: InjectionService
  ) { }


  @ContentChild(AXSchedulerViewsProperty)
  viewManager: AXSchedulerViewsProperty;

  @ContentChild(AXToolbarComponent)
  toolbar: AXToolbarComponent;

  @ContentChild(AXToolbarSchedulerViewsComponent)
  toolbarView: AXToolbarSchedulerViewsComponent;

  @ViewChild('viewContainer', { read: ViewContainerRef }) viewContainer: ViewContainerRef;

  ngOnInit(): void { }

  private _currentView: string;
  @Input()
  public get currentView(): string {
    return this._currentView;
  }
  public set currentView(v: string) {
    this.setView(v);
  }

  private viewItems: MenuItem[] = [];

  setView(name: string) {
    this._currentView = name;
    if (this.viewManager.views) {
      this.viewItems.forEach(c => {
        c.selected = false;
      });
      this.viewItems.find(c => c.name == name).selected = true;
      let selected = this.viewManager.views.find(c => c.name == name);

      if (this.viewContainer) {
        this.viewContainer.clear();
        if (selected.type == "day") {
          this.injector.appendComponent(AXSchedulerDayTimeViewComponent, {
            timeSlot: 1,
            interval: selected.interval
          }, this.viewContainer.element.nativeElement);
        }
        if (selected.type == "week") {
          this.injector.appendComponent(AXSchedulerDayTimeViewComponent, {
            timeSlot: 1,
            interval: selected.interval * 7
          }, this.viewContainer.element.nativeElement);
        }
        if (selected.type == "month") {
          this.injector.appendComponent(AXSchedulerMonthViewComponent, {
            timeSlot: 1,
            interval: selected.interval * 7
          }, this.viewContainer.element.nativeElement);
        }
      }
    }
  }

  ngAfterViewInit(): void {
    setTimeout(_ => {
      this.viewManager.views.forEach(v => {
        this.viewItems.push({
          groupName: "view",
          name: v.name,
          text: v.caption
        });
      });

      this.toolbarView.onViewChanged.subscribe(c => {
        this.currentView = c;
      });
      this.toolbarView.items = this.viewItems;
      this.setView(this.currentView);
    });
  }

  ngAfterViewChecked(): void {
    this.updateSize();
  }

  private updateSize() {
    let toolbar = this.elm.nativeElement.querySelector<HTMLElement>(
      ".ax-scheduler-toolbar"
    );
    let container = this.elm.nativeElement.querySelector<HTMLElement>(
      ".view-container"
    );
    if (toolbar) {
      container.style.height = `calc(100% - ${toolbar.clientHeight}px)`;
    }
  }
}
