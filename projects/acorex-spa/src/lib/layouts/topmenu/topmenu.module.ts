import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXTopMenuLayoutComponent } from './topmenu.layout';
import { ACoreXUIModule } from 'acorex-ui';
import {
    AXLayoutSharedModule
} from '../shared/api';


@NgModule({
    declarations: [AXTopMenuLayoutComponent],
    imports: [CommonModule, ACoreXUIModule, AXLayoutSharedModule],
    exports: [AXTopMenuLayoutComponent],
    providers: [],
})
export class AXTopMenuModule { }