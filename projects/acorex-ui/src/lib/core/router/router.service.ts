import { Injectable } from '@angular/core';
import { AXRoute } from './router.class';

@Injectable()
export class AXRouterService {
    routes: AXRoute[] = [];

    register(routes: AXRoute[]) {
        this.routes.push(...routes);
    }

    resolve(path: string): AXRoute {
        return this.routes.find(c => path == path);
    }
}