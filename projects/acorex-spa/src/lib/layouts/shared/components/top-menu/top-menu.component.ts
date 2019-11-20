import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem, AXNavigator, AXMenuComponent, AXToolbarMenuComponent } from "acorex-ui";
import { AXNavMenuService } from "../../../shared/services/nav-menu.service";


@Component({
    selector: 'ax-top-menu',
    templateUrl: './top-menu.component.html'
})
export class AXSPATopMenuComponent {


    @ViewChild('contexMenu', /* TODO: add static flag */ {})
    contexMenu: AXMenuComponent;


    @ViewChild('menu', /* TODO: add static flag */ {})
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
                this.contexMenu.items = this.favCtxItems;
                this.renderMenu();
            });
        }
        else {
            this.navMenuService.getItems().then((all: MenuItem[]) => {
                this.all = all;
                this.navMenuItems = this.all.filter(c => c.parentId == null).slice();
                this.contexMenu.items = this.allCtxItems;
                this.renderMenu();
            });
        }

    }

    private renderMenu() {
        
        this.navMenuItems.forEach(i => {
            this.transformMenus(i, this.all.slice());
        });
        setTimeout(() => {
            this.contexMenu.update();
        }, 500);
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

    onContextItemClick(e: MenuItem) {
        let target = this.contexMenu.currentTarget as HTMLElement;
        let uid = target.getAttribute("data-uid");
        let selectedMenu = this.all.find(c => c.uid == uid);
        if (!selectedMenu)
            return;
        switch (e.name) {
            case "open":
                {
                    this.onItemClick(selectedMenu);
                    this.menu.close();
                    this.contexMenu.close();
                    break;
                }
            case "hide":
                {
                    selectedMenu.visible = false;
                    this.menu.update();
                    break;
                }
            case "addFav":
                {
                    this.navMenuService.setFavorites(selectedMenu, true);
                    break;
                }
            case "removeFav":
                {
                    this.navMenuService.setFavorites(selectedMenu, false);
                    this.reloadMenu();
                    break;
                }
            case "showFavs":
                {
                    this.showFavs = true;
                    this.reloadMenu();
                    break;
                }
            case "showAll":
                {
                    this.showFavs = false;
                    this.reloadMenu();
                    break;
                }
            case "reset":
                {
                    this.all.forEach(c => { c.visible = true });
                    this.reloadMenu();
                    break;
                }
        }

    }
}
