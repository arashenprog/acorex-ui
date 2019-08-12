import { Component, OnInit } from '@angular/core';
import { AXBasePageComponent, SelectItem } from 'acorex-ui';

@Component({
    templateUrl: './picker.page.html'
})
export class PickerPage extends AXBasePageComponent {
    constructor() {
        super()
    }
    selectBoxItem: SelectItem[] = [
        { id: "1", text: "item one" },
        { id: "2", text: "item two" },
        { id: "3", text: "item three" },
        { id: "4", text: "item four" },
        { id: "5", text: "item five" },
        { id: "6", text: "item six" },
        { id: "7", text: "item seven" },
        { id: "8", text: "item eight" },
        { id: "9", text: "item nine" },
        { id: "10", text: "item teen" }
    ]
}
