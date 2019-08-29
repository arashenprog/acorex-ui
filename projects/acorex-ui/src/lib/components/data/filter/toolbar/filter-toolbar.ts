import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { AXToolbarItem } from '../../../layout/toolbar/toolbar-item';
import { AXToolbarDropdownComponent } from '../../../layout/toolbar/dropdown/toolbar-dropdown.component';



@Component({
    selector: 'ax-toolbar-filter-view',
    template: `
        <ax-toolbar-dropdown text="Select Me" icon="fas fa-filter" #dropdown>
            <div>
                
            </div>
        </ax-toolbar-dropdown>
    `,
    providers: [{ provide: AXToolbarItem, useExisting: AXToolbarFilterViewComponent }]
})
export class AXToolbarFilterViewComponent {
    constructor() { }

    @ViewChild(AXToolbarDropdownComponent) dropdown: AXToolbarDropdownComponent;
 

    update(): void {
        //this.menu.update();
    }


}
