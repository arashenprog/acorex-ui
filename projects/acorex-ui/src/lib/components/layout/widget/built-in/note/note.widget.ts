import { Component, Input } from '@angular/core';
import { AXWidgetComponent, registerWidget } from '../../api';

@Component({
    templateUrl: './note.widget.html',
    styleUrls: ['./note.widget.scss']
})
export class AXNoteWidgetComponent extends AXWidgetComponent {

    colors:string[]=[
        "#bbdefb",
        "#b2ebf2",
        "#c8e6c9",
        "#ffecb3",
        "#ffccbc",
    ]

    constructor() {
        super();
    }

    @Input()
    text: string;

    @Input()
    color: string;

    setColor(color: string) {
        this.color = color;
    }

}


registerWidget({
    type: AXNoteWidgetComponent,
    title: "Note"
});