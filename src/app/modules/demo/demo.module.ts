import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestPageComponent } from './test-page.component';
import { DemoPage } from './demo-page.component';
import { TestHttpComponent } from './http-test.page';
import { DashboardPage } from './dashboard/dashboard.page';
import { AcorexSpaModule } from 'acorex-spa';
import { ACoreXUIModule } from 'acorex-ui';
import { LeadListPage } from '../crm/lead/pages/lead-list.page';

@NgModule({
    declarations: [
        TestPageComponent,
        DemoPage,
        TestHttpComponent,
        DashboardPage
    ],
    imports: [
        CommonModule,
        ACoreXUIModule,
        AcorexSpaModule
    ],
    exports: [],
    providers: [],
    entryComponents: [
        TestPageComponent,
        DemoPage,
        TestHttpComponent,
        DashboardPage
    ]
})
export class DemoModule { }