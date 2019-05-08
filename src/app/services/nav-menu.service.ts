import { Injectable } from '@angular/core';
import { AXNavMenuService } from 'acorex-spa';
import { PromisResult, MenuItem } from 'acorex-ui';

@Injectable()
export class NavMenuService extends AXNavMenuService {
    getItems(): PromisResult<MenuItem[]> {
        return new PromisResult((resolve) => {
            let items: MenuItem[]=[];
            items.push({ name: "item1", text: "آیتم 1", id: "10", visible:true });
            items.push({ name: "item2", text: "آیتم 2", id: "20", visible:true });
            items.push({ name: "item3", text: "آیتم 3", id: "30", visible:true });
            items.push({ name: "item4", text: "آیتم 4", id: "40", visible:true });

            resolve(items);
        });
    }
    getFavorites(): PromisResult<MenuItem[]> {
        throw new Error("Method not implemented.");
    }

    setFavorites(menu: MenuItem, value: boolean): PromisResult<boolean> {
        throw new Error("Method not implemented.");
    }

    serach(search: String): PromisResult<MenuItem[]> {
        throw new Error("Method not implemented.");
    }

    clickItem(item: MenuItem): PromisResult<boolean> {
        throw new Error("Method not implemented.");
    }

}
