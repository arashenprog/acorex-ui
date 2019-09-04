import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ViewEncapsulation, ElementRef } from '@angular/core';
import { AXToolbarItem } from '../../../layout/toolbar/toolbar-item';
import { AXToolbarMenuComponent } from '../../../layout/toolbar/menu/toolbar-menu.component';
import { MenuItem } from '../../../../core/menu.class';
import { AXFilterPanelComponent } from '../filter-panel/filter-panel.component';



@Component({
    selector: 'ax-toolbar-filter-view',
    template: `
        <ax-toolbar-menu [items]="items" (itemClick)="itemClick($event)" #menu [menuTemplate]="t1">
            <ng-template let-item #t1>
                <div class="ax-toolbar-menu-item-text">
                    <span>
                        <i class="{{ item.startIcon }} ax-menu-item-icon"></i>&nbsp;
                        {{ item.text }}
                    </span>
                    <ng-container *ngIf="item.type; else elseTemplate">
                        <i class="fas fa-trash icon-remove"></i>
                    </ng-container>
                    <ng-template #elseTemplate>
                        <i class="fas"></i>
                    </ng-template>
                </div>
            </ng-template>
        </ax-toolbar-menu>
    `,
    styleUrls: ["./filter-toolbar.component.scss"],
    encapsulation: ViewEncapsulation.None,
    providers: [{ provide: AXToolbarItem, useExisting: AXToolbarFilterViewComponent }]
})
export class AXToolbarFilterViewComponent {
    constructor() { }

    @ViewChild(AXToolbarMenuComponent) menu: AXToolbarMenuComponent;

    @Input()
    filterPanel: AXFilterPanelComponent;

    items: MenuItem[] = [
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
                {
                    split: true,
                    name: "addFolder",
                    startIcon: "fas fa-folder",
                    text: "New Folder",
                },
                {
                    split: true,
                    name: "save",
                    startIcon: "fas fa-save",
                    text: "Save"
                },
                {
                    name: "saveAs",
                    startIcon: "fas fa-save",
                    text: "Save As..."
                }
            ]
        }

    ]


    ngAfterViewInit(): void {
        this.setCurrent(this.root.items[0]);
        this.menu.update();
    }

    itemClick(e: MenuItem) {
      
        if (e.type == "f") {
            if (e.name == "selectAll") {
                this.setCurrent(e);
                this.filterPanel.clear();
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
                        data: this.filterPanel.value
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
        this.menu.update();
    }

    private findSelected(): MenuItem {
        return this.root.items.find(c => c.selected);
    }

    private get root(): MenuItem {
        return this.items[0];
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
}
