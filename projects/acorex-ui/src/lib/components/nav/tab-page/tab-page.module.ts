import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXTabPageRendererComponent } from './tab-page-Renderer.component';
import { AXTabPageService } from './tab-page.service';

@NgModule({
    declarations: [AXTabPageRendererComponent],
    imports: [ CommonModule ],
    exports: [AXTabPageRendererComponent],
    entryComponents:[AXTabPageRendererComponent],
    providers: [AXTabPageService],
})
export class AXTabPageModule {}