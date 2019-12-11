import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXTimeBoxComponent } from './time-box.component';
import { AXButtonModule } from '../../form/button/button.module'
@NgModule({
    declarations: [AXTimeBoxComponent],
    imports: [CommonModule, AXButtonModule],
    exports: [AXTimeBoxComponent],
    providers: [],
})
export class AXTimeBoxModule { }