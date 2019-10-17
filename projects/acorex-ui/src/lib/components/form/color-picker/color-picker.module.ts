import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXColorPickerComponent } from './color-picker.component';
import { AXColorBoxComponent } from './color-box/color-box.component';
import { AXDropDownModule } from "../drop-down/drop-down.module";
import { AXValidationModule } from '../validation/validation.module';

@NgModule({
    declarations: [AXColorPickerComponent, AXColorBoxComponent],
    imports: [CommonModule, AXDropDownModule,  AXValidationModule],
    exports: [AXColorPickerComponent, AXColorBoxComponent],
    providers: []
})
export class AXColorPickerModule { }