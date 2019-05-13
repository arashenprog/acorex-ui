import { Injectable } from '@angular/core';

import { PromisResult, MenuItem, BaseMenuItem } from 'acorex-ui';
import { AXNavMenuService, AXHeaderBarMenuService } from 'acorex-spa';

@Injectable()
export class HeaderBarMenuService extends AXHeaderBarMenuService {

    private mockItems: BaseMenuItem[] = [
        { icon: "fas fa-cogs", style: "bk-danger" },
        { icon: "fas fa-expand", style: "bk-success" },
        { icon: "fas fa-comment-alt" },
        { icon: "fas fa-power-off" },

    ]

    getItems(): PromisResult<MenuItem[]> {
        return new PromisResult((resolve) => {
            resolve(this.mockItems);
        });
    }

    clickItem(item: MenuItem): PromisResult<boolean> {
        return new PromisResult((resolve) => {
            console.log(item);
            resolve(true);
        });
    }

}
