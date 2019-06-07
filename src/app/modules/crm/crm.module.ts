import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcorexSpaModule } from 'acorex-spa';
import { ACoreXUIModule } from 'acorex-ui';
import { LeadModule } from './lead/lead.module';
import { TaskModule } from './task/task-detail.module';

@NgModule({
    declarations: [
    ],
    imports: [
        CommonModule,
        ACoreXUIModule,
        AcorexSpaModule,
        LeadModule,
        TaskModule
    ],
    exports: [],
    entryComponents: [
    ]
})
export class CRMModule { }