import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXRouterService, AXRouterConfigService } from './router.service';
import { AXRoutes } from './router.class';

@NgModule({
    declarations: [],
    imports: [CommonModule],
    exports: [],
    providers: [AXRouterService],
})
export class AXRouterModule {
    static forRoot(routes?: AXRoutes): ModuleWithProviders {
        return {
            ngModule: AXRouterModule,
            providers: [{ provide: AXRouterConfigService, useValue: routes }]
        };
    }
}