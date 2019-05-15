import { NgModule } from '@angular/core';
import { AXDataSourceComponent } from './datasource.component';
import { AXDataSourceRemoteReadComponent } from './read-component';
import { AXHttpModule } from '../../core/http/http.module';

@NgModule({
    declarations: [AXDataSourceComponent, AXDataSourceRemoteReadComponent],
    imports: [AXHttpModule],
    exports: [AXDataSourceComponent, AXDataSourceRemoteReadComponent],
    providers: [],
})
export class AXDataSourceModule { }