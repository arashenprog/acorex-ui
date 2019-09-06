import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ViewEncapsulation, ElementRef } from '@angular/core';
import { AXToolbarItem } from '../../../layout/toolbar/toolbar-item';
import { AXToolbarMenuComponent } from '../../../layout/toolbar/menu/toolbar-menu.component';
import { MenuItem } from '../../../../core/menu.class';
import { AXFilterPanelComponent } from '../filter-panel/filter-panel.component';
import { AXHtmlUtil } from '../../../../core/utils/html/html-util';
import { AXMenuComponent } from '../../../layout/menu/menu.component';



@Component({
    selector: 'ax-toolbar-filter-view',
    templateUrl: './filter-toolbar.component.html',
    styleUrls: ["./filter-toolbar.component.scss"],
    encapsulation: ViewEncapsulation.None,
    providers: [{ provide: AXToolbarItem, useExisting: AXToolbarFilterViewComponent }]
})
export class AXToolbarFilterViewComponent {
    constructor() { }
    _uid: string = AXHtmlUtil.getUID();

    @ViewChild('menu') menu: AXToolbarMenuComponent;
    @ViewChild('contextMenu') contextMenu: AXMenuComponent;

    @Input()
    filterPanel: AXFilterPanelComponent;

    contextMenuItems: MenuItem[] = [
        // {
        //     name: "addFolder",
        //     startIcon: "fas fa-folder",
        //     text: "New Folder",
        // },
        {
            name: "remove",
            startIcon: "fas fa-trash",
            text: "Delete",
        },
    ];



    menuItems: MenuItem[] = [
        {
            name: "root",
            startIcon: "fas fa-filter",
            text: "Select All",
            items: [
                {
                    name: "selectAll",
                    type: "f",
                    text: "Select All",
                },
                // {
                //     split: true,
                //     name: "addFolder",
                //     startIcon: "fas fa-folder",
                //     text: "New Folder",
                // },
                {
                    split: true,
                    name: "save",
                    startIcon: "fas fa-save",
                    text: "Save"
                },
                {
                    split: true,
                    name: "saveAs",
                    startIcon: "fas fa-save",
                    text: "Save As..."
                }
            ]
        }

    ]


    ngAfterViewInit(): void {
        setTimeout(() => {
            this.selectAll();
            this.addPredefinedList();
        }, 100);
    }
    addPredefinedList() {
        this.filterPanel.predefinedFilters.forEach(c=>{
            let item = {
                name: c.name,
                text: c.title,
                type: "f",
                data: c.value,
                uid:AXHtmlUtil.getUID()
            };
            this.root.items.splice(1, 0, item);
        });
        this.update();
    }

    public selectAll():void {
        this.setCurrent(this.root.items[0]);
        this.filterPanel.clear();
        this.update();
        this.menu.close();
        this.contextMenu.close();
    }

    itemClick(e: MenuItem) {

        if (e.type == "f") {
            if (e.name == "selectAll") {
                this.selectAll();
            }
            else {
                this.setCurrent(e);
                this.filterPanel.load(e.data);
            }
        }
        else {
            if (e.name == "saveAs") {
                let name = prompt("Please enter the name;");
                if (name) {
                    let item = {
                        text: name,
                        type: "f",
                        data: this.filterPanel.value,
                        uid:AXHtmlUtil.getUID()
                    };
                    this.root.items.splice(1, 0, item);
                    this.setCurrent(item);
                }

            }
            if (e.name == "save") {
                let selected = this.findSelected();
                if (selected)
                    selected.data = this.filterPanel.value;
                //this.filterPanel.save();
            }
        }
        this.update();
    }

    private findSelected(): MenuItem {
        return this.root.items.find(c => c.selected);
    }

    private get root(): MenuItem {
        return this.menuItems[0];
    }

    public update(): void {
        this.menu.update();
        setTimeout(() => {
            this.contextMenu.update();    
        }, 100);
        
    }

    private setCurrent(e: MenuItem) {
        this.root.text = e.text;
        this.root.items.filter(c => c.type == "f").forEach(c => {
            c.selected = false;
            c.startIcon = "fas";
        })
        e.selected = true;
        e.startIcon = "fas fa-check";
        this.root.items.find(c => c.name == "save").visible = e.name != "selectAll";
    }

    onCtxClick(e: MenuItem) {
        debugger;
        let target = this.contextMenu.currentTarget as HTMLElement;
        let menuId = target.getAttribute("data-menu-id");
        if (e.name == "remove" && menuId) {
            this.root.items = this.root.items.filter(c => c.uid != menuId);
            this.selectAll();
        }
    }
}
