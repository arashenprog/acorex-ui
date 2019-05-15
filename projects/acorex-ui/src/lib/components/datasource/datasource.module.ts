import { NgModule } from '@angular/core';
import { AXDataSourceComponent } from './datasource.component';
import { AXDataSourceRemoteRead } from './read-component';
import { AXHttpModule } from '../../core/http/http.module';

@NgModule({
    declarations: [AXDataSourceComponent, AXDataSourceRemoteRead],
    imports: [AXHttpModule],
    exports: [AXDataSourceComponent, AXDataSourceRemoteRead],
    providers: [],
})
export class AXDataSourceModule { }