import { Injectable } from '@angular/core';

import { PromisResult, MenuItem } from 'acorex-ui';
import { AXNavMenuService } from 'acorex-spa';

@Injectable()
export class NavMenuService extends AXNavMenuService {

    private mockItems:MenuItem[]=[
        { name: "item1", text: "آیتم 1", id: "10", visible:true },
        { name: "item2", text: "آیتم 2", id: "20", visible:true },
        { name: "item3", text: "آیتم 3", id: "30", visible:true },
        { name: "item4", text: "آیتم 4", id: "40", visible:true }
    ]

    getItems(): PromisResult<MenuItem[]> {
        return new PromisResult((resolve) => {
            resolve(this.mockItems);
        });
    }
    getFavorites(): PromisResult<MenuItem[]> {
        return new PromisResult((resolve) => {
            resolve(this.mockItems.slice(1,2));
        });
    }

    setFavorites(menu: MenuItem, value: boolean): PromisResult<boolean> {
        throw new Error("Method not implemented.");
    }

    serach(search: string): PromisResult<MenuItem[]> {
        return new PromisResult((resolve) => {
            resolve(this.mockItems.filter(c=>c.text.includes(search)));
        });
    }

    clickItem(item: MenuItem): PromisResult<boolean> {
        throw new Error("Method not implemented.");
    }

}
