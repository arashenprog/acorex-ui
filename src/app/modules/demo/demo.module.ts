import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoPage } from './demo-page.component';
import { DashboardPage } from './dashboard/dashboard.page';
import { AcorexSpaModule } from 'acorex-spa';
import { ACoreXUIModule } from 'acorex-ui';
import { AliPage } from './ali/ali.page';
import { AXSchedulerModule } from 'src/app/shared/components/scheduler/api';

@NgModule({
    declarations: [
        DemoPage,
        DashboardPage,
        AliPage
    ],
    imports: [
        CommonModule,
        ACoreXUIModule,
        AcorexSpaModule,
        AXSchedulerModule
    ],
    exports: [],
    providers: [],
    entryComponents: [
        DemoPage,
        DashboardPage,
        AliPage
    ]
})
export class DemoModule { }