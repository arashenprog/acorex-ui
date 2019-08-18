import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { AXTextInputBaseComponent } from "../../../core/base.class";
@Component({
    selector: 'ax-edit-box',
    templateUrl: './edit-box.component.html',
    styleUrls: ['./edit-box.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AXEditBoxComponent extends AXTextInputBaseComponent {
    constructor() {
        super()
    }
    @Input() data: any = ""
    showEdit: boolean = false
    onEditClick() {
        this.showEdit = true
    }
    onSaveClick(){
        this.showEdit = false

    }
    onCancelClick(){
        this.showEdit = false
        
    }
}
