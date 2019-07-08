import {
  Component,
  OnInit,
  ContentChild,
  Input,
  ViewEncapsulation,
  ElementRef,
  ViewChild,
  ComponentRef,
  Output,
  EventEmitter,
  ChangeDetectorRef
} from "@angular/core";
import { AXSchedulerViewsProperty } from "./scheduler-views.property";
import { AXToolbarSchedulerViewsComponent } from "./toolbars/scheduler-toolbar-views";
import { MenuItem } from "../../../core/menu.class";
import { AXToolbarComponent } from "../../layout/toolbar/toolbar.component";
import { AXSchedulerDayTimeViewComponent } from "./views/daytime/scheduler-daytime-view.component";
import { ComponentPortal, CdkPortalOutlet } from '@angular/cdk/portal';
import { AXSchedulerBaseViewComponent, AXSchedulerEventChangeArgs } from "./views/scheduler-view.component";
import { AXSchedulerMonthViewComponent } from "./views/month/scheduler-month-view.component";
import { AXDateTime, AXDateTimeRange } from "../../../core/calendar/datetime";
import { AXToolbarSchedulerNavigatorComponent } from "./toolbars/scheduler-toolbar-navigator";
import { AXSchedulerEvent } from "./scheduler.model";
import { AXSchedulerAgendaViewComponent } from "./views/agenda/scheduler-agenda-view.component";
import { AXSchedulerTimelineViewComponent } from './views/timeline/scheduler-timeline-view.component';



@Component({
  selector: "ax-scheduler",
  templateUrl: "./scheduler.component.html",
  styleUrls: ["./scheduler.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class AXSchedulerComponent implements OnInit {
  constructor(
    private elm: ElementRef<HTMLDivElement>,
    private cdr: ChangeDetectorRef
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

  @Input()
  events: AXSchedulerEvent[] = [];

  @Output()
  onEventChanged: EventEmitter<AXSchedulerEventChangeArgs> = new EventEmitter<AXSchedulerEventChangeArgs>();

  setView(name: string) {
    this._currentView = name;
    if (this.viewManager.views) {
      this.viewItems.forEach(c => {
        c.selected = false;
      });
      //
      if (this.view)
        this.view.ngOnDestroy();
      //
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
      this.view.type = selected.type;
      this.view.interval = interval;
      this.view.events = this.events;
      this.view.onEventChanged.subscribe(e => {
        this.onEventChanged.emit(e);
      });
      this.view.onNavigatorDateChanged.subscribe((e) => {
        this.setNavigatorText();
      });
      this.view.navigate(this.today);
    }
  }


  private setNavigatorText() {
    debugger;
    if (this.toolbarNavigator) {
      let range = this.view.dateRange;
      let text: string = "";
      if (range) {
        let sameDay = range.startTime.compaire(range.endTime, "day") == 0;
        let sameMonth = range.startTime.compaire(range.endTime, "month") == 0;
        let sameYear = range.startTime.compaire(range.endTime, "year") == 0;
        if (this.view.type != "month" && sameDay)
          text = range.startTime.format("MMMM DD, YYYY");
        //
        else if (this.view.type != "month" && sameMonth && sameYear)
          text = `${range.startTime.format("MMMM DD")} - ${range.endTime.format("DD, YYYY")}`;
        //
        else if (this.view.type != "month" && sameYear)
          text = `${range.startTime.format("MMM DD")} - ${range.endTime.format("MMM DD, YYYY")}`;
        //
        else if (this.view.type != "month")
          text = `${range.startTime.format("MMM DD, YYYY")} - ${range.endTime.format("MMM DD, YYYY")}`;
        //
        else if (this.view.type == "month")
          text = range.startTime.add("day",15).format("MMMM YYYY");
      }
      this.toolbarNavigator.setDisplay(text);
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
          else if (c == "prev") {
            this.view.prev();
          }
          else {
            this.view.navigate(c);
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

}
