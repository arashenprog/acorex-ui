import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXPageComponent, AXPageFooterComponent, AXPageContentComponent, AXPageSideStartComponent, AXPageSideEndComponent } from './api';

@NgModule({
    declarations: [AXPageContentComponent,AXPageFooterComponent,AXPageComponent,AXPageSideEndComponent,AXPageSideStartComponent],
    imports: [ CommonModule ],
    exports: [AXPageContentComponent,AXPageFooterComponent,AXPageComponent,AXPageSideEndComponent,AXPageSideStartComponent],
    providers: [],
})
export class AXPageModule {}