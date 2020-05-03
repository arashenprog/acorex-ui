import { AXNavigator, AXNavigatorParam, AXTabPageService, AXTabPage } from 'acorex-ui';
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
            return this.tab.open({
                title: params.title ? params.title : (route.data ? route.data.title : null),
                content: route.component,
                data: data
            });
        }
        return null
    }

    popup(params: AXNavigatorParam) {

    }

    // private findExistTab(component: any, data: any): AXTabPage {
    //     try {
    //         if (!data)
    //             data = {};
    //         let result = this.tab.tabs.find(c =>
    //             c.content == component &&
    //             ((!c.option) ||
    //                 JSON.stringify(data) == JSON.stringify(c.option))
    //         );
    //         return result;
    //     } catch (error) {
    //         return null;
    //     }
    // }

}