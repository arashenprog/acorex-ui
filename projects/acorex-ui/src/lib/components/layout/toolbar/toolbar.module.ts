import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXToolbarComponent } from './toolbar.component';
import { AXToolbarMenuComponent } from './menu/toolbar-menu.component';
import { AXToolbarSearchComponent } from './search/toolbar-search.component';

@NgModule({
    declarations: [AXToolbarComponent, AXToolbarMenuComponent,AXToolbarSearchComponent],
    imports: [CommonModule],
    exports: [AXToolbarComponent, AXToolbarMenuComponent,AXToolbarSearchComponent],
    providers: [],
})
export class AXToolbarModule { }