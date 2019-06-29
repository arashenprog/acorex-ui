import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXCalendarBoxComponent } from './calendar-box.component';

@NgModule({
    declarations: [AXCalendarBoxComponent],
    imports: [ CommonModule ],
    exports: [AXCalendarBoxComponent],
    providers: [],
})
export class AXCalendarBoxModule {}