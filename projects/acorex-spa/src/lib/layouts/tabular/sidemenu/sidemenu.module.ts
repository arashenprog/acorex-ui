import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXSideMenuComponent } from './sidemenu.layout';
import { FormsModule } from '@angular/forms';
import { AcoreXUIModule } from "acorex-ui"
@NgModule({
    declarations: [AXSideMenuComponent],
    imports: [CommonModule, AcoreXUIModule, FormsModule],
    exports: [AXSideMenuComponent],
    providers: [],
})
export class AXSideMenuModule { }