import { AXNavigator, AXNavigatorParam, AXTabPageService } from 'acorex-ui';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AXTabNavService extends AXNavigator {

    constructor(private tab: AXTabPageService, private router: Router) {
        super();

    }

    navigate(params: AXNavigatorParam) {
        //debugger;
        let route = this.router.config.find(c => c.path == params.path);
        if (route) {
            this.tab.open({
                title: params.title ? params.title : (route.data ? route.data.title : null),
                content: route.component
            });
        }
    }

    popup(params: AXNavigatorParam) {

    }
}