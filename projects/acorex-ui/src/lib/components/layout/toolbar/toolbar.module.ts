import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXToolbarComponent } from './toolbar.component';
import { AXToolbarMenuComponent } from './menu/toolbar-menu.component';

@NgModule({
    declarations: [AXToolbarComponent, AXToolbarMenuComponent],
    imports: [CommonModule],
    exports: [AXToolbarComponent, AXToolbarMenuComponent],
    providers: [],
})
export class AXToolbarModule { }