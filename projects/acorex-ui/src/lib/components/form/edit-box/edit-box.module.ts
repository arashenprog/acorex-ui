import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXEditBoxComponent } from './edit-box.component';

@NgModule({
    declarations: [AXEditBoxComponent],
    imports: [ CommonModule ],
    exports: [AXEditBoxComponent],
    providers: [],
})
export class AXEditBoxModule {}