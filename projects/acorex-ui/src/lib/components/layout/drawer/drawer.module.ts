import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXDrawerComponent } from './drawer.component';

@NgModule({
    declarations: [AXDrawerComponent],
    imports: [ CommonModule ],
    exports: [AXDrawerComponent],
    providers: [],
})
export class AXDrawerModule {}