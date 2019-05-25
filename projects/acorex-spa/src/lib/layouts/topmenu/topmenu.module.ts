import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXTopMenuLayoutComponent } from './topmenu.layout';
import { ACoreXUIModule } from 'acorex-ui';

@NgModule({
    declarations: [AXTopMenuLayoutComponent],
    imports: [ CommonModule,ACoreXUIModule ],
    exports: [AXTopMenuLayoutComponent],
    providers: [],
})
export class AXTopMenuModule {}