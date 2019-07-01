import { NgModule } from '@angular/core';
import { AXSchedulerComponent } from './scheduler.component';
import { AXSchedulerViewsProperty, AXSchedulerViewProperty } from './scheduler-views.property';
import { AXSchedulerDayTimeViewComponent } from './views/daytime/scheduler-daytime-view.component';
import { AXToolbarSchedulerViewsComponent } from './toolbars/scheduler-toolbar-views';
import { AXToolbarModule } from '../../layout/toolbar/toolbar.module';
import { AXCoreModule } from '../../../core/core.module';
import { AXSchedulerMonthViewComponent } from './views/month/scheduler-month-view.component';
import { PortalModule } from '@angular/cdk/portal';
import { AXToolbarSchedulerNavigatorComponent } from './toolbars/scheduler-toolbar-navigator';
import { AXSchedulerAgendaViewComponent } from './views/agenda/scheduler-agenda-view.component';
import { AXSchedulerTimelineViewComponent } from './views/timeline/scheduler-timeline-view.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
    declarations: [
        AXSchedulerComponent,
        AXSchedulerViewsProperty,
        AXSchedulerViewProperty,
        AXSchedulerDayTimeViewComponent,
        AXSchedulerMonthViewComponent,
        AXSchedulerAgendaViewComponent,
        AXSchedulerTimelineViewComponent,
        AXToolbarSchedulerViewsComponent,
        AXToolbarSchedulerNavigatorComponent
    ],
    imports: [AXCoreModule, AXToolbarModule,PortalModule,DragDropModule],
    exports: [
        AXSchedulerComponent,
        AXSchedulerViewsProperty,
        AXSchedulerViewProperty,
        AXSchedulerDayTimeViewComponent,
        AXSchedulerMonthViewComponent,
        AXSchedulerAgendaViewComponent,
        AXSchedulerTimelineViewComponent,
        AXToolbarSchedulerViewsComponent,
        AXToolbarSchedulerNavigatorComponent
    ],
    entryComponents: [
        AXSchedulerMonthViewComponent, 
        AXSchedulerDayTimeViewComponent,
        AXSchedulerAgendaViewComponent,
        AXSchedulerTimelineViewComponent
    ],
    providers: [],
})
export class AXSchedulerModule { }   