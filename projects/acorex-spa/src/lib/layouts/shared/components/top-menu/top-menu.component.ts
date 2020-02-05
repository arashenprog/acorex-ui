import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem, AXNavigator, AXMenuComponent, AXToolbarMenuComponent } from "acorex-ui";
import { AXNavMenuService } from "../../../shared/services/nav-menu.service";


@Component({
    selector: 'ax-top-menu',
    templateUrl: './top-menu.component.html'
})
export class AXSPATopMenuComponent {





    @ViewChild('menu', { static: true })
    menu: AXToolbarMenuComponent;

    showFavs: boolean = false;



    private all: MenuItem[] = [];
    navMenuItems: MenuItem[] = [];
    allCtxItems: MenuItem[] = [
        {
            name: "open",
            text: "Open in new tab",
            icon: "fas",
        },
        // {
        //     name: "openInNew",
        //     icon: "fas",
        //     text: "Open in new window"
        // },
        // {
        //     name: "showFavs",
        //     text: "Bookmarks",
        //     icon: "fas fa-star"
        // },
        // {

        //     name: "addFav",
        //     text: "Add to Bookmarks",
        //     icon: "fas fa-plus"
        // },
        {
            split: true,
            name: "hide",
            text: "Hide this item",
            icon: "far fa-eye-slash"
        },
        {
            split: true,
            name: "reset",
            text: "Reset",
            icon: "fas fa-redo"
        },

    ];

    favCtxItems: MenuItem[] = [
        // {
        //     name: "open",
        //     text: "Open in new tab",
        //     icon: "fas",
        // },
        // {
        //     name: "openInNew",
        //     icon: "fas",
        //     text: "Open in new window"
        // },
        {
            name: "showAll",
            text: "Show All Menu",
            icon: "fas fa-star"
        },
        {

            name: "removeFav",
            text: "Remove from Bookmarks",
            icon: "fas fa-trash"
        },
    ];

    constructor(
        public nav: AXNavigator,
        private navMenuService: AXNavMenuService
    ) { }

    ngAfterViewInit(): void {
        this.reloadMenu();
    }


    private reloadMenu() {
        if (this.showFavs) {
            this.navMenuService.getFavorites().then((all: MenuItem[]) => {
                this.all = all;
                this.navMenuItems = this.all.slice();
                this.renderMenu();
            });
        }
        else {
            this.navMenuService.getItems().then((all: MenuItem[]) => {
                this.all = all;
                this.navMenuItems = this.all.filter(c => c.parentId == null).slice();
                this.renderMenu();
            });
        }

    }

    private renderMenu() {
        
        this.navMenuItems.forEach(i => {
            this.transformMenus(i, this.all.slice());
        });
    }

    private transformMenus(item: MenuItem, items: MenuItem[]) {
        item.items = items.filter(c => c.parentId == item.id);
        item.style = 'ax-top-menu-item';
        item.items.forEach(i => {
            this.transformMenus(i, items.slice());
        });
        return item;
    }


    onItemClick(e: MenuItem) {
        this.navMenuService.clickItem(e).then(c => {
            //
        });
    }
}
