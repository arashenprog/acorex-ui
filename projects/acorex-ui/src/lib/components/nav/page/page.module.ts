import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXPageContentComponent } from './content.component';
import { AXPageFooterComponent } from './footer.component';
import { AXPageComponent } from './page.component';

@NgModule({
    declarations: [AXPageContentComponent, AXPageFooterComponent, AXPageComponent],
    imports: [CommonModule],
    exports: [AXPageContentComponent, AXPageFooterComponent, AXPageComponent],
    providers: [],
})
export class AXPageModule { }