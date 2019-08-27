import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXRouterService } from './router.service';
import { Routes } from './router.class';

@NgModule({
    declarations: [],
    imports: [CommonModule],
    exports: [],
    providers: [AXRouterService],
})
export class AXRouterModule {
    static forRoot(routes:Routes): ModuleWithProviders {

        return {
            ngModule: AXRouterModule,
            providers: [ {provide: AXRouterService, useValue: routes }]
        };
    }
}