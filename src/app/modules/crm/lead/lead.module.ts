import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeadService } from './lead.service';
import { LeadListPage } from './pages/lead-list.page';
import { ACoreXUIModule } from 'acorex-ui';
import { AcorexSpaModule } from 'acorex-spa';
import { AngularSplitModule } from 'angular-split';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

@NgModule({
    declarations: [LeadListPage],
    imports: [CommonModule,
        ACoreXUIModule, 
        AcorexSpaModule,
        AngularSplitModule.forRoot(),
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory
        }),],
    exports: [LeadListPage],
    providers: [LeadService],
    entryComponents: [LeadListPage]
})
export class LeadModule { }