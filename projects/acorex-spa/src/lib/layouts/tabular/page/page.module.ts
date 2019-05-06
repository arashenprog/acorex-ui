import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXPageComponent } from './page.component';
import { BasePage } from './BasePage';
import { AXPageContentComponent } from './content.component';
import { AXPageRendererComponent } from './page-renderer.component';

@NgModule({
    declarations: [AXPageComponent,AXPageContentComponent,AXPageRendererComponent],
    imports: [ CommonModule ],
    exports: [AXPageComponent,AXPageContentComponent,AXPageRendererComponent],
    providers: [],
})
export class AXPageModule {}