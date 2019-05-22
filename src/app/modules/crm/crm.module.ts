import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcorexSpaModule } from 'acorex-spa';
import { AcoreXUIModule } from 'acorex-ui';
import { LeadModule } from './lead/lead.module';

@NgModule({
    declarations: [
    ],
    imports: [
        CommonModule,
        AcoreXUIModule,
        AcorexSpaModule,
        LeadModule
    ],
    exports: [],
    entryComponents: [
    ]
})
export class CRMModule { }