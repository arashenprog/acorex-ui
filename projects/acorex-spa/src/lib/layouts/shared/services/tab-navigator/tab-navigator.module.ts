import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXTabNavService } from './navigator.service';
import { AXTabPageModule, AXNavigator } from 'acorex-ui';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        AXTabPageModule
    ],
    exports: [],
    providers: [
        {
            provide: AXNavigator,
            useClass: AXTabNavService
        }
    ],
})
export class AXTabNavigatorModule { }