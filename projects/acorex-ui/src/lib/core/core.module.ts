import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventService } from '../services/event.service';
import { InjectionService } from '../services/injection.service';
import { TranslateService, TranslatePipe } from '../services/translate.service';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
    declarations: [TranslatePipe],
    imports: [CommonModule, FormsModule, BrowserAnimationsModule],
    exports: [CommonModule, TranslatePipe, BrowserAnimationsModule],
    providers: [EventService, InjectionService, TranslateService, InjectionService],
})
export class AXCoreModule { }