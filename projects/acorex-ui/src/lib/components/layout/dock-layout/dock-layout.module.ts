import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXDockLayoutComponent } from './dock-layout.component';
import { AXDockPanelContentComponent } from './dock-panel-content.component';
import { AXDockPanelComponent } from './dock-panel.component';

@NgModule({
    declarations: [AXDockLayoutComponent,AXDockPanelComponent,AXDockPanelContentComponent],
    imports: [CommonModule],
    exports: [AXDockLayoutComponent,AXDockPanelComponent,AXDockPanelContentComponent],
    providers: [],
})
export class AXDockLayoutModule { }