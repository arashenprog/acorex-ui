import { NgModule } from '@angular/core';
import { AXDataSourceComponent } from './datasource.component';
import { AXDataSourceRemoteRead } from './remote-read.component';
import { AXHttpModule } from '../../core/http/http.module';
import { AXDataSourceCallbackRead } from './callback-read.component';

@NgModule({
    declarations: [AXDataSourceComponent, AXDataSourceRemoteRead,AXDataSourceCallbackRead],
    imports: [AXHttpModule],
    exports: [AXDataSourceComponent, AXDataSourceRemoteRead,AXDataSourceCallbackRead],
    providers: [],
})
export class AXDataSourceModule { }