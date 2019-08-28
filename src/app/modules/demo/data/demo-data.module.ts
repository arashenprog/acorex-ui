import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPanelDemoPage } from './filter-panel.page';
import { ACoreXUIModule } from 'acorex-ui';
import { ACoreXSPAModule } from 'acorex-spa';
import { Routes, RouterModule } from '@angular/router';


const ROUTES: Routes = [
    {
        path: "components/Data/filter",
        component: FilterPanelDemoPage
    }
];

@NgModule({
    declarations: [FilterPanelDemoPage],
    imports: [
        CommonModule,
        ACoreXUIModule,
        ACoreXSPAModule,
        RouterModule.forRoot(ROUTES),
    ],
    exports: [FilterPanelDemoPage],
    entryComponents: [FilterPanelDemoPage],
    providers: [],
})
export class DemoDataModule {

}