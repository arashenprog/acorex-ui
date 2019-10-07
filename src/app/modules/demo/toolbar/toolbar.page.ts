import { Component, OnInit } from '@angular/core';
import { AXBasePageComponent, MenuItem } from 'acorex-ui';

@Component({
    templateUrl: './toolbar.page.html',
})
export class ToolbarPage extends AXBasePageComponent {
    constructor() {
        super()
    }
    listToolbarItems: MenuItem[] = [
        {
            icon: "fas fa-rocket",
            name: "openPopup",
            text: "Open Popup"
        }
    ]
    onOpenPopup(event): void {
    }
    onToolbarClick(item) {
        switch (item.name) {
            case "openPopup":
                
                break;
        
        }
    }
}
