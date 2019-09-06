import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXTopMenuLayoutComponent } from './topmenu.layout';
import { ACoreXUIModule} from 'acorex-ui';

import { AXPageModule } from '../shared/page/page.module';
import { AXLayoutTabsModule } from '../shared/components/tabs/tabs.module';
import { AXTabNavigatorModule } from '../shared/services/tab-navigator/tab-navigator.module';
import { AXSPATopModule } from '../shared/components/top-menu/top-menu.module';


@NgModule({
    declarations: [AXTopMenuLayoutComponent],
    imports: [
        CommonModule,
        ACoreXUIModule,
        AXPageModule,
        AXLayoutTabsModule,
        AXTabNavigatorModule,
        AXSPATopModule
    ],
    exports: [AXTopMenuLayoutComponent],
    providers: [],
})
export class AXTopMenuModule { }