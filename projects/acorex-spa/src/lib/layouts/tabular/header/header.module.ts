import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXHeaderComponent } from './header.layout';

@NgModule({
    declarations: [AXHeaderComponent],
    imports: [ CommonModule ],
    exports: [AXHeaderComponent],
    providers: [],
})
export class AXHeaderModule {}