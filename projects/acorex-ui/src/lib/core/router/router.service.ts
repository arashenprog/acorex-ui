import { Injectable, InjectionToken, Inject } from '@angular/core';
import { AXRoute, AXRoutes } from './router.class';



export const AXRouterConfigService = new InjectionToken<AXRoutes>("AXRouterConfig")

@Injectable({ providedIn: "root" })
export class AXRouterService {
    private static ROUTES: AXRoutes = [];


    constructor(@Inject(AXRouterConfigService) private routes) {
        debugger;
        this.register(routes);
    }

    register(routes: AXRoutes) {
        if (routes)
            AXRouterService.ROUTES.push(...routes);
    }

    resolve(path: string): AXRoute {
        return AXRouterService.ROUTES.find(c => c.path == path);
    }

    getAll(): AXRoutes {
        return AXRouterService.ROUTES;
    }
}