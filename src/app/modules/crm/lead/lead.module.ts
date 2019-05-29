import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeadService } from './lead.service';
import { LeadListPage } from './pages/lead-list.page';
import { ACoreXUIModule } from 'acorex-ui';
import { AcorexSpaModule } from 'acorex-spa';
import { AngularSplitModule } from 'angular-split';

@NgModule({
    declarations: [LeadListPage],
    imports: [CommonModule, ACoreXUIModule, AcorexSpaModule,AngularSplitModule.forRoot()],
    exports: [LeadListPage],
    providers: [LeadService],
    entryComponents:[LeadListPage]
})
export class LeadModule { }