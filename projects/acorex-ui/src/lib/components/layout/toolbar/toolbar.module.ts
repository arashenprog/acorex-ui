import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXToolbarComponent } from './toolbar.component';
import { AXToolbarMenuComponent } from './menu/toolbar-menu.component';
import { AXToolbarSearchComponent } from './search/toolbar-search.component';
import { AXToolbarTitleComponent } from './title/toolbar-title.component';
import { AXToolbarButtonGroupComponent } from './group-button/toolbar-group-button.component';
import { AXToolbarDropdownComponent } from './dropdown/toolbar-dropdown.component';
import { AXPopoverModule } from '../popover/popover.module';


const COMPONENTS= [
    AXToolbarComponent, 
    AXToolbarMenuComponent,
    AXToolbarSearchComponent,
    AXToolbarTitleComponent,
    AXToolbarButtonGroupComponent,
    AXToolbarDropdownComponent
]

@NgModule({
    declarations: [COMPONENTS],
    imports: [CommonModule,AXPopoverModule],
    exports: [COMPONENTS],
    providers: [],
})
export class AXToolbarModule { }