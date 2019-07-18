import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXColorPickerComponent } from './color-picker.component';
import { AXColorBoxComponent } from './color-box/color-box.component';

@NgModule({
    declarations: [AXColorPickerComponent, AXColorBoxComponent],
    imports: [CommonModule],
    exports: [AXColorPickerComponent, AXColorBoxComponent],
    providers: []
})
export class AXColorPickerModule { }