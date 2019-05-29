import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXTopMenuLayoutComponent } from './topmenu.layout';
import { ACoreXUIModule } from 'acorex-ui';
import {
    AXLayoutSharedModule
} from '../shared/api';
import { AXPageModule } from '../shared/page/page.module';


@NgModule({
    declarations: [AXTopMenuLayoutComponent],
    imports: [CommonModule, ACoreXUIModule, AXLayoutSharedModule, AXPageModule],
    exports: [AXTopMenuLayoutComponent],
    providers: [],
})
export class AXTopMenuModule { }