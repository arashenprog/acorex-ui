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
  ChangeDetectorRef,
  NgZone,
  ViewContainerRef
} from "@angular/core";
import { AXSchedulerViewsProperty, AXSchedulerViewProperty } from "./scheduler-views.property";
import { AXToolbarSchedulerViewsComponent } from "./toolbars/scheduler-toolbar-views";
import { MenuItem } from "../../../core/menu.class";
import { AXToolbarComponent } from "../../layout/toolbar/toolbar.component";
import { AXSchedulerDayTimeViewComponent } from "./views/daytime/scheduler-daytime-view.component";
import { ComponentPortal, CdkPortalOutlet } from '@angular/cdk/portal';
import { AXSchedulerBaseViewComponent } from "./views/scheduler-view.component";
import { AXSchedulerMonthViewComponent } from "./views/month/scheduler-month-view.component";
import { AXDateTime, AXDateTimeRange } from "../../../core/calendar/datetime";
import { AXToolbarSchedulerNavigatorComponent } from "./toolbars/scheduler-toolbar-navigator";
import { AXSchedulerAgendaViewComponent } from "./views/agenda/scheduler-agenda-view.component";
import { AXSchedulerTimelineViewComponent } from './views/timeline/scheduler-timeline-view.component';
import { AXSchedulerEventChangeArgs, AXSchedulerEvent } from "./scheduler.class";
import { AXToolbarSearchComponent } from "../../layout/toolbar/search/toolbar-search.component";
import { AXDataSourceComponent } from "../../data/data-source/datasource.component";



@Component({
  selector: "ax-scheduler",
  templateUrl: "./scheduler.component.html",
  styleUrls: ["./scheduler.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class AXSchedulerComponent {
  constructor(
    private elm: ElementRef<HTMLDivElement>,
    private zone: NgZone,
    private cdr: ChangeDetectorRef
  ) { }

  @ViewChild(CdkPortalOutlet)
  private portalOutlet: CdkPortalOutlet


  @ViewChild("container")
  private container: ElementRef<HTMLElement>;

  @ContentChild(AXSchedulerViewsProperty)
  private viewManager: AXSchedulerViewsProperty;

  @ContentChild(AXToolbarSchedulerViewsComponent)
  private toolbarView: AXToolbarSchedulerViewsComponent;
  @ContentChild(AXToolbarSchedulerNavigatorComponent)
  private toolbarNavigator: AXToolbarSchedulerNavigatorComponent;

  @ContentChild(AXToolbarSearchComponent)
  searchInput: AXToolbarSearchComponent;

  @ContentChild(AXDataSourceComponent)
  private dataSource: AXDataSourceComponent;

  view: AXSchedulerBaseViewComponent;


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
  private navigatorDate = new AXDateTime();
  searchText: string;

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
      this.viewItems.find(c => c.name == name).selected = true;
      let selected = this.viewManager.views.find(c => c.name == name);
      this.createView(selected);
    }
  }


  private createView(selected: AXSchedulerViewProperty) {
    this.startAnim();
    if (this.view)
      this.view.ngOnDestroy();
    //
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
    //
    this.view.onEventChanged.subscribe(e => {
      this.onEventChanged.emit(e);
    });
    this.view.onNavigatorDateChanged.subscribe((e) => {
      this.navigatorDate = e;
      this.setNavigatorText();
      this.startAnim();
    });
    this.refresh();
  }


  private setNavigatorText() {
    if (this.toolbarNavigator) {
      this.toolbarNavigator.set(this.view.dateRange, this.view.type);
    }
  }

  private startAnim() {
    this.container.nativeElement.classList.remove('ax-anim-fade-in-fwd');
    this.container.nativeElement.style.opacity = "0";
    setTimeout(() => {
      this.container.nativeElement.classList.add('ax-anim-fade-in-fwd');
    }, 250);
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
      //
      this.dataSource.onDataReceived.subscribe(e => {
        this.events = e;
        this.view.events = this.events;
        if (this.searchText && this.view.events && this.view.events.length) {
          this.navigatorDate = this.view.events[0].range.startTime;
        }
        if (this.navigatorDate)
          this.view.navigate(this.navigatorDate);
        else
          this.view.navigate(this.today);
      })
      //
      if (this.toolbarView) {
        this.toolbarView.onViewChanged.subscribe(c => {
          this.currentView = c;
        });
        this.toolbarView.items = this.viewItems;
      }
      //
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
      //
      if (this.searchInput) {
        this.searchInput.onTextChanged.subscribe(c => {
          this.searchText = c;
          if (c) {
            this.viewItems.forEach(c => { c.visible = false; })
            const x: AXSchedulerViewProperty = new AXSchedulerViewProperty("agenda", "Search", "VIEW_SEARCH");
            x.interval = 100;
            this.createView(x);
            this.refresh();
          }
          else {
            this.viewItems.forEach(c => { c.visible = true; });
            this.setView(this._currentView);
          }
          this.toolbarView.update();
        })
      }
      //
      this.setView(this.currentView);
      this.refresh();
    });
  }

  ngAfterViewChecked(): void {
    this.updateSize();
  }

  private updateSize() {
    this.zone.runOutsideAngular(() => {
      let toolbar = this.elm.nativeElement.querySelector<HTMLElement>(
        ".ax-scheduler-toolbar"
      );
      if (toolbar) {
        this.container.nativeElement.style.height = `calc(100% - ${toolbar.clientHeight}px)`;
      }
    });
  }

  ngOnDestroy(): void {
    this.portalOutlet.detach();
  }

  refresh() {
    this.dataSource.fetch({
      searchText: this.searchText,
    });
  }

}
