import { Component, OnInit, Input } from '@angular/core';
import { SelectItem } from "../../../core/select.class";
import { AXSelectBaseComponent } from '../../../core/base.class';

@Component({
    selector: 'ax-drop-down',
    templateUrl: './drop-down.component.html',
    styleUrls: ['./drop-down.component.scss']
})
export class AXDropDownComponent extends AXSelectBaseComponent {
    @Input() items: SelectItem[] = [];
    @Input() searchable: boolean = false;
}
