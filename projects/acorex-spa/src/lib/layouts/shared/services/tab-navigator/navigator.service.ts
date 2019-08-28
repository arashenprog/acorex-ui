import { AXNavigator, AXNavigatorParam, AXTabPageService, AXRouterService } from 'acorex-ui';
import { Injectable } from '@angular/core';

@Injectable()
export class AXTabNavService extends AXNavigator {

    constructor(private tab: AXTabPageService, private router: AXRouterService) {
        super();
    }

    navigate(params: AXNavigatorParam) {
        debugger;
        let route = this.router.resolve(params.path);
        if (route) {
            this.tab.open({
                title: params.title ? params.title : route.title,
                content: route.component
            });
        }
    }

    popup(params: AXNavigatorParam) {

    }
}