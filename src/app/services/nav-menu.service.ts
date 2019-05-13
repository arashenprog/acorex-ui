import { Injectable } from '@angular/core';

import { PromisResult, MenuItem, AXTabPageService } from 'acorex-ui';
import { AXNavMenuService } from 'acorex-spa';
import { TestHttpComponent } from '../pages/http-test.page';
import { TestPageComponent } from '../test-page.component';

@Injectable()
export class NavMenuService extends AXNavMenuService {

    constructor(private tab: AXTabPageService) {
        super();
    }

    private mockItems: MenuItem[] = [
        { name: "item1", text: "صفحه اصلی", id: "10", visible: true, data: { page: TestPageComponent } },
        { name: "item2", text: "تست http", id: "20", visible: true, data: { page: TestHttpComponent } },
        { name: "item3", text: "آیتم 3", id: "30", visible: true },
        { name: "item4", text: "آیتم 4", id: "40", visible: true },
        { name: "item11", text: "آیتم 11", id: "101", parentId: "40", visible: true },
        { name: "item12", text: "آیتم 12", id: "102", parentId: "40", visible: true },
    ]

    getItems(): PromisResult<MenuItem[]> {
        return new PromisResult((resolve) => {
            resolve(this.mockItems);
        });
    }
    getFavorites(): PromisResult<MenuItem[]> {
        return new PromisResult((resolve) => {
            resolve(this.mockItems.slice(1, 2));
        });
    }

    setFavorites(menu: MenuItem, value: boolean): PromisResult<boolean> {
        throw new Error("Method not implemented.");
    }

    serach(search: string): PromisResult<MenuItem[]> {
        return new PromisResult((resolve) => {
            debugger;
            resolve(this.mockItems.filter(c => c.text.includes(search)));
        });
    }

    clickItem(item: MenuItem): PromisResult<boolean> {
        return new PromisResult((resolve) => {
            console.log(item);
            if (item.data.page)
                this.tab.open(item.data.page, "تست");
            resolve(true);
        });
    }

}
