import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestPageComponent } from './test-page.component';
import { DemoPage } from './demo-page.component';
import { TestHttpComponent } from './http-test.page';
import { DashboardPage } from './dashboard/dashboard.page';
import { AcorexSpaModule } from 'acorex-spa';
import { AcoreXUIModule } from 'acorex-ui';

@NgModule({
    declarations: [
        TestPageComponent,
        DemoPage,
        TestHttpComponent,
        DashboardPage
    ],
    imports: [
        CommonModule,
        AcoreXUIModule,
        AcorexSpaModule
    ],
    exports: [],
    providers: [{
        provide: "startUpTab",
        useValue: {
            content: DashboardPage,
            title: "Dashboard",
            closable: false,
            uid: "dashboard"
        }
    }],
    entryComponents: [
        TestPageComponent,
        DemoPage,
        TestHttpComponent,
        DashboardPage
    ]
})
export class DemoModule { }