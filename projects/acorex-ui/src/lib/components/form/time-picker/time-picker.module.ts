import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXTimePickerComponent } from './time-picker.component';
import { AXDropDownModule } from '../drop-down/drop-down.module';
import { AXTimeBoxModule } from '../../time/time-box/time-box.module';



@NgModule({
    declarations: [AXTimePickerComponent],
    imports: [CommonModule, AXDropDownModule, AXTimeBoxModule],
    exports: [AXTimePickerComponent],
    providers: [],
})
export class AXTimePickerModule { }