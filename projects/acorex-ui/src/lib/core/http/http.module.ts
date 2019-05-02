import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AXHttpService } from './http.service';

@NgModule({
    declarations: [],
    imports: [CommonModule, HttpClientModule],
    exports: [],
    providers: [AXHttpService],
})
export class AXHttpModule { }