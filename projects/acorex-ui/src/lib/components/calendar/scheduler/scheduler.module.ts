import { NgModule } from '@angular/core';
import { AXSchedulerComponent } from './scheduler.component';
import { AXSchedulerViewsComponent } from './scheduler-views.components';
import { AXSchedulerViewComponent } from './scheduler-view.component';
import { AXSchedulerDayTimeViewComponent } from './views/scheduler-day-time-view.component';
import { AXToolbarSchedulerViewsComponent } from './toolbars/scheduler-toolbar-views';
import { AXToolbarModule } from '../../layout/toolbar/toolbar.module';
import { AXCoreModule } from '../../../core/core.module';
import { AXSchedulerMonthViewComponent } from './views/scheduler-month-view.component';

@NgModule({
    declarations: [
        AXSchedulerComponent,
        AXSchedulerViewComponent,
        AXSchedulerViewsComponent,
        AXSchedulerDayTimeViewComponent,
        AXSchedulerMonthViewComponent,
        AXToolbarSchedulerViewsComponent
    ],
    imports: [AXCoreModule,AXToolbarModule ],
    exports: [
        AXSchedulerComponent,
        AXSchedulerViewComponent,
        AXSchedulerViewsComponent,
        AXSchedulerDayTimeViewComponent,
        AXSchedulerMonthViewComponent,
        AXToolbarSchedulerViewsComponent
    ],
    providers: [],
})
export class AXSchedulerModule { }   