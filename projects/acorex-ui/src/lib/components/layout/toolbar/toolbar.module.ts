import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXToolbarComponent } from './toolbar.component';
import { AXToolbarMenuComponent } from './menu/toolbar-menu.component';
import { AXToolbarSearchComponent } from './search/toolbar-search.component';
import { AXToolbarTitleComponent } from './title/toolbar-title.component';

@NgModule({
    declarations: [AXToolbarComponent, AXToolbarMenuComponent,AXToolbarSearchComponent,AXToolbarTitleComponent],
    imports: [CommonModule],
    exports: [AXToolbarComponent, AXToolbarMenuComponent,AXToolbarSearchComponent,AXToolbarTitleComponent],
    providers: [],
})
export class AXToolbarModule { }