import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXSchedulerComponent } from './scheduler.component';
import { AXSchedulerViewsComponent } from './scheduler-views.components';
import { AXSchedulerViewComponent } from './scheduler-view.component';
import { AXSchedulerDayTimeViewComponent } from './views/scheduler-day-time-view.component';

@NgModule({
    declarations: [
        AXSchedulerComponent,
        AXSchedulerViewsComponent,
        AXSchedulerViewComponent,
        AXSchedulerDayTimeViewComponent
    ],
    imports: [CommonModule],
    exports: [
        AXSchedulerComponent,
        AXSchedulerViewsComponent,
        AXSchedulerViewComponent,
        AXSchedulerDayTimeViewComponent
    ],
    providers: [],
})
export class AXSchedulerModule { }   