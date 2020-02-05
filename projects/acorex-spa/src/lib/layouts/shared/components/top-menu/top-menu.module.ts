import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXSPATopMenuComponent } from './top-menu.component';
import { ACoreXUIModule} from 'acorex-ui';
import { AXLayoutTabsModule } from '../../../shared/components/tabs/tabs.module';
import { AXTabNavigatorModule } from '../../../shared/services/tab-navigator/tab-navigator.module';

@NgModule({
    declarations: [AXSPATopMenuComponent],
    imports: [
        CommonModule,
        ACoreXUIModule,
        AXLayoutTabsModule,
        AXTabNavigatorModule
    ],
    exports: [
        AXSPATopMenuComponent, 
    ],
    providers: [],
})
export class AXSPATopModule { }