import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXNumberBoxComponent } from './number-box.component';
import { AXButtonModule } from '../button/button.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AXNumberBoxComponent],
  imports: [CommonModule, AXButtonModule, FormsModule],
  exports: [AXNumberBoxComponent],
  providers: []
})
export class AXNumberBoxModule {}
