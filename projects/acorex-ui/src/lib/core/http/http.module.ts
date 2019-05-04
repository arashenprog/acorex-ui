import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AXHttpService } from './http.service';
import { AXErrorModule } from '../error/error.module';

@NgModule({
    declarations: [],
    imports: [
        CommonModule, 
        HttpClientModule, 
        AXErrorModule
    ],
    exports: [],
    providers: [AXHttpService],
})
export class AXHttpModule {
  
}