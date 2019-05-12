import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXDrawerComponent } from './drawer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    declarations: [AXDrawerComponent],
    imports: [ CommonModule,BrowserAnimationsModule ],
    exports: [AXDrawerComponent],
    providers: [],
})
export class AXDrawerModule {}