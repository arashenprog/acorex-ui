import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'ax-time-picker',
    templateUrl: './time-picker.component.html',
    styleUrls: ['./time-picker.component.scss']
})
export class AXTimePickerComponent {
    constructor() { }
    @Input() label: string = "Select Time";
    _text: string = ""
}
