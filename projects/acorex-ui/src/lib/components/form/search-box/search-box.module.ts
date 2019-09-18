import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXSearchBoxComponent } from './search-box.component';
import { AXTextBoxModule } from '../../form/text-box/text-box.module';
import { AXButtonModule } from '../../form/button/button.module';

@NgModule({
    declarations: [AXSearchBoxComponent],
    imports: [CommonModule, AXTextBoxModule,AXButtonModule],
    exports: [AXSearchBoxComponent],
    providers: [],
})
export class AXSearchBoxModule { }