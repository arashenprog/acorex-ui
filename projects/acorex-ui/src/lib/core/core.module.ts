import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventService } from './event.service';
import { InjectionService } from './injection.service';
import { TranslateService, TranslatePipe } from './translate.service';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
    declarations: [TranslatePipe],
    imports: [CommonModule, FormsModule, BrowserAnimationsModule],
    exports: [ TranslatePipe, BrowserAnimationsModule],
    providers: [EventService, InjectionService, TranslateService],
})
export class AXCoreModule { }