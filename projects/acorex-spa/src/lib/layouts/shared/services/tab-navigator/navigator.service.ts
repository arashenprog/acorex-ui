import { AXNavigator, AXNavigatorParam, AXTabPageService } from 'acorex-ui';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AXTabNavService extends AXNavigator {

    constructor(private tab: AXTabPageService, private router: Router) {
        super();

    }

    navigate(params: AXNavigatorParam) {
        let route = this.router.config.find(c => c.path == params.path);
        if (route) {
            let data = {
                route: params.path,
            };
            data = Object.assign(data, params.data);
            this.tab.open({
                title: params.title ? params.title : (route.data ? route.data.title : null),
                content: route.component,
                data: data
            });
        }
    }

    popup(params: AXNavigatorParam) {

    }
}