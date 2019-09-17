import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { SelectItem } from "../../../core/select.class";
import { AXSelectBaseComponent } from '../../../core/base.class';
import { AXPopoverComponent } from '../../layout/popover/popover.component';

@Component({
    selector: 'ax-drop-down',
    templateUrl: './drop-down.component.html',
    styleUrls: ['./drop-down.component.scss']
})
export class AXDropDownComponent extends AXSelectBaseComponent {
    
    @ViewChild("popSelectBox")
    popSelectBox:AXPopoverComponent

    @Input() icon: string = "fas fa-angle-down"
    @Input() fitParent: boolean = true;

    close(){
        this.popSelectBox.close();
    }

    focus():void{
        
    }
}
