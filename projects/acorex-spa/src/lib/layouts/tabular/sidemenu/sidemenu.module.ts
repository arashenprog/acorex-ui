import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXSideMenuComponent } from './sidemenu.layout';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [AXSideMenuComponent],
    imports: [ CommonModule ,AXSideMenuModule,FormsModule],
    exports: [AXSideMenuComponent],
    providers: [],
})
export class AXSideMenuModule {}