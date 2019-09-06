import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem, AXTabPageService,AXMenuComponent } from "acorex-ui";
import { AXNavMenuService} from "../../../shared/services/nav-menu.service";


@Component({
    selector: 'ax-top-menu',
    templateUrl: './top-menu.component.html'
})
export class AXSPATopMenuComponent implements OnInit {


    @ViewChild('contexMenu') 
    contexMenu:AXMenuComponent;




    navMenuItems: MenuItem[] = [];
    contextMenuItems: MenuItem[] = [
        {
            name:"addFav",
            text:"Add to Bookmarks",
            icon:"fas fa-star"
        },
        {
            name:"hide",
            text:"Hide this item",
            icon:"far fa-eye-slash"
        }
    ];

    constructor(
        public tabService: AXTabPageService,
        private navMenuService: AXNavMenuService
    ) { }

    ngOnInit(): void {
        this.navMenuService.getItems().then((all: MenuItem[]) => {
            this.navMenuItems = all.filter(c => c.parentId == null).slice();
            this.navMenuItems.forEach(i => {
                this.transformMenus(i, all.slice());
            });     
            setTimeout(() => {
                this.contexMenu.update();
            }, 500);       
        });
    }

    ngAfterViewInit(): void {
        
    }

    private transformMenus(item: MenuItem, items: MenuItem[]) {
        item.items = items.filter(c => c.parentId == item.id);
        item.style='ax-top-menu-item';
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

    onContextItemClick(e:MenuItem)
    {
        switch(e.name)
        {
            case "hide":
                {
                    break;
                }
        }
    }
}
