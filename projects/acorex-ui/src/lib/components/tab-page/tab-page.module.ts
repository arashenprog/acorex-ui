import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXTabPageRendererComponent } from './tab-page-Renderer.component';

@NgModule({
    declarations: [AXTabPageRendererComponent],
    imports: [ CommonModule ],
    exports: [AXTabPageRendererComponent],
    entryComponents:[AXTabPageRendererComponent],
    providers: [],
})
export class AXTabPageModule {}