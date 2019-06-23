import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXSchedulerComponent } from './scheduler.component';
import { AXSchedulerViewsComponent } from './scheduler-views.components';
import { AXSchedulerViewComponent } from './scheduler-view.component';
import { AXSchedulerDayTimeViewComponent } from './views/scheduler-day-time-view.component';
import { AXToolbarSchedulerViewsComponent } from './toolbars/scheduler-toolbar-views';
import { AXToolbarModule } from 'acorex-ui';

@NgModule({
    declarations: [
        AXSchedulerComponent,
        AXSchedulerViewsComponent,
        AXSchedulerViewComponent,
        AXSchedulerDayTimeViewComponent,
        AXToolbarSchedulerViewsComponent
    ],
    imports: [CommonModule,AXToolbarModule],
    exports: [
        AXSchedulerComponent,
        AXSchedulerViewsComponent,
        AXSchedulerViewComponent,
        AXSchedulerDayTimeViewComponent,
        AXToolbarSchedulerViewsComponent
    ],
    providers: [],
})
export class AXSchedulerModule { }   