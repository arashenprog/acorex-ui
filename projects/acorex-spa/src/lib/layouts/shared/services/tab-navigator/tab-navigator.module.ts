import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXTabNavService } from './navigator.service';
import { AXRouterModule,AXTabPageModule,AXNavigator} from 'acorex-ui';

@NgModule({
    declarations: [],
    imports: [ 
        CommonModule,
        AXRouterModule.forRoot(),
        AXTabPageModule ],
    exports: [],
    providers: [
        {
            provide: AXNavigator,
            useClass: AXTabNavService
        }
    ],
})
export class AXTabNavigatorModule {}