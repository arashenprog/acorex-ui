import {
  Component,
  OnInit,
  ContentChild,
  Input,
  ViewEncapsulation,
  ElementRef,
  ViewChild,
  ViewContainerRef,
  ComponentRef
} from "@angular/core";
import { AXSchedulerViewsProperty } from "./scheduler-views.property";
import { AXToolbarSchedulerViewsComponent } from "./toolbars/scheduler-toolbar-views";
import { MenuItem } from "../../../core/menu.class";
import { AXToolbarComponent } from "../../layout/toolbar/toolbar.component";
import { AXSchedulerDayTimeViewComponent } from "./views/scheduler-day-time-view.component";
import { InjectionService } from "../../../core/injection.service";
import { ComponentPortal, CdkPortalOutlet } from '@angular/cdk/portal';
import { AXSchedulerBaseViewComponent } from "./views/scheduler-view.component";
import { AXSchedulerMonthViewComponent } from "./views/scheduler-month-view.component";
import { AXDateTime } from "../../../core/calendar/datetime";
import { AXToolbarSchedulerNavigatorComponent } from "./toolbars/scheduler-toolbar-navigator";
import { AXSchedulerEvent } from "./scheduler.model";



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
      range: {
        startTime: new AXDateTime(),
        endTime: new AXDateTime()
      },
      title: "Event#1"
    },
    {
      range: {
        startTime: new AXDateTime().addDay(2),
        endTime: new AXDateTime().addDay(3)
      },
      title: "Event#1"
    }
  ]
}
