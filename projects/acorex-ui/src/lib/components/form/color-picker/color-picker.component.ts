import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { AXDropDownComponent } from '../drop-down/drop-down.component';
import { AXValidatableComponent } from '../../../core/base.class';
import { AXColorBoxComponent } from './color-box/color-box.component';
import { Color, AXColorUtil } from '../../../core/color.class';

@Component({
    selector: 'ax-color-picker',
    templateUrl: './color-picker.component.html',
    providers: [
        { provide: AXValidatableComponent, useExisting: AXColorPickerComponent },
    ]
})
export class AXColorPickerComponent extends AXColorBoxComponent {

    @ViewChild("dropdown", /* TODO: add static flag */ {})
    dropdown: AXDropDownComponent;
    @Input() placeholder: string = "";
    @Input() showClear: boolean = false;

    @Input() label: string;

    _text: string = ""
    constructor() {
        super();
    }

    focus(): void {
        this.dropdown.focus();
    }

    handleValueChange(c: string) {
        this.dropdown.close();
    }

    findTextColor(color: string) {
        if (!color)
            return "#000";
        return !(AXColorUtil.contrastToWhite(color) > 2.0) ? "#000" : "#fff";
    }

}
