import {
  Component,
  OnInit,
  ContentChild,
  Input,
  ViewEncapsulation,
  ElementRef,
  ViewChild,
  ComponentRef
} from "@angular/core";
import { AXSchedulerViewsProperty } from "./scheduler-views.property";
import { AXToolbarSchedulerViewsComponent } from "./toolbars/scheduler-toolbar-views";
import { MenuItem } from "../../../core/menu.class";
import { AXToolbarComponent } from "../../layout/toolbar/toolbar.component";
import { AXSchedulerDayTimeViewComponent } from "./views/scheduler-day-time-view.component";
import { ComponentPortal, CdkPortalOutlet } from '@angular/cdk/portal';
import { AXSchedulerBaseViewComponent } from "./views/scheduler-view.component";
import { AXSchedulerMonthViewComponent } from "./views/scheduler-month-view.component";
import { AXDateTime, AXDateTimeRange } from "../../../core/calendar/datetime";
import { AXToolbarSchedulerNavigatorComponent } from "./toolbars/scheduler-toolbar-navigator";
import { AXSchedulerEvent } from "./scheduler.model";
import { AXSchedulerAgendaViewComponent } from "./views/scheduler-agenda-view.component";
import { AXSchedulerTimelineViewComponent } from './views/timeline/scheduler-timeline-view.component';



@Component({
  selector: "ax-scheduler",
  templateUrl: "./scheduler.component.html",
  styleUrls: ["./scheduler.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class AXSchedulerComponent implements OnInit {
  constructor(private elm: ElementRef<HTMLDivElement>
  ) { }

  @ViewChild(CdkPortalOutlet) portalOutlet: CdkPortalOutlet

  @ContentChild(AXSchedulerViewsProperty)
  viewManager: AXSchedulerViewsProperty;

  @ContentChild(AXToolbarComponent)
  toolbar: AXToolbarComponent;

  @ContentChild(AXToolbarSchedulerViewsComponent)
  toolbarView: AXToolbarSchedulerViewsComponent;
  @ContentChild(AXToolbarSchedulerNavigatorComponent)
  toolbarNavigator: AXToolbarSchedulerNavigatorComponent;

  view: AXSchedulerBaseViewComponent;

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
  private today = new AXDateTime();

  setView(name: string) {
    this._currentView = name;
    if (this.viewManager.views) {
      this.viewItems.forEach(c => {
        c.selected = false;
      });
      this.viewItems.find(c => c.name == name).selected = true;
      let selected = this.viewManager.views.find(c => c.name == name);

      let portal: ComponentPortal<AXSchedulerBaseViewComponent>;
      this.portalOutlet.detach();
      let interval = selected.interval;
      if (selected.type == "day") {
        portal = new ComponentPortal<AXSchedulerBaseViewComponent>(AXSchedulerDayTimeViewComponent);
      }
      if (selected.type == "week") {
        portal = new ComponentPortal<AXSchedulerBaseViewComponent>(AXSchedulerDayTimeViewComponent);
        interval = selected.interval * 7
      }
      if (selected.type == "month") {
        portal = new ComponentPortal<AXSchedulerBaseViewComponent>(AXSchedulerMonthViewComponent);
      }
      if (selected.type == "agenda") {
        portal = new ComponentPortal<AXSchedulerBaseViewComponent>(AXSchedulerAgendaViewComponent);
      }
      if (selected.type == "timeline") {
        portal = new ComponentPortal<AXSchedulerBaseViewComponent>(AXSchedulerTimelineViewComponent);
      }
      const compRef: ComponentRef<AXSchedulerBaseViewComponent> = this.portalOutlet.attach(portal);
      this.view = compRef.instance;
      this.view.interval = interval;
      this.view.events = this.data;
      this.view.navigate(this.today);
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

      if (this.toolbarView) {
        this.toolbarView.onViewChanged.subscribe(c => {
          this.currentView = c;
        });
        this.toolbarView.items = this.viewItems;
      }
      if (this.toolbarNavigator) {
        this.toolbarNavigator.onNavigate.subscribe(c => {
          if (c == "next") {
            this.view.next();
          }
          if (c == "prev") {
            this.view.prev();
          }
        });
      }
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

  ngOnDestroy(): void {
    this.portalOutlet.detach();
  }


  data: AXSchedulerEvent[] = [
    {
      range: new AXDateTimeRange(new AXDateTime("2019-06-05 19:30"),new AXDateTime("2019-06-05 22:30")),
      title: "Birds Of Pray",
      uid: "e1",
      color:"rgb(127, 169, 0)"
    },
    {
      range: new AXDateTimeRange(new AXDateTime("2019-06-13 08:30"),new AXDateTime("2019-06-14 12:30")),
      title: "Play Day",
      uid: "e2",
      color:"rgb(26, 170, 85)"
    },
    {
      range: new AXDateTimeRange(new AXDateTime("2019-06-18 12:30"),new AXDateTime("2019-06-19 14:00")),
      title: "Halloween party",
      uid: "e3",
      color:"rgb(245, 127, 23)"
    },
    {      
      range: new AXDateTimeRange(new AXDateTime("2019-06-29 08:30"),new AXDateTime("2019-06-29 09:30")),
      title: "Face Painting & Drawing events",
      uid: "e4",
      color:"rgb(53, 124, 210)"
    },
    {
      range: new AXDateTimeRange(new AXDateTime("2019-06-29 08:30"),new AXDateTime("2019-06-29 12:30")),
      title: "Pony rides",
      uid: "e5",
      color:"rgb(53, 124, 108)"
    },
    {
      range: new AXDateTimeRange(new AXDateTime("2019-07-05 08:30:00"),new AXDateTime("2019-07-05 15:00:00 ")),
      title: "Arash's Birthday",
      uid: "e6",
      color:"rgb(53, 124, 210)"
    },
    {      
      range: new AXDateTimeRange(new AXDateTime("2019-07-07 07:00:00"),new AXDateTime("2019-07-10 08:30:00")),
      title: "Los Angeles to Barcelona",
      uid: "e7",
      color:"rgb(26, 170, 85)"
    },
  ]
}
