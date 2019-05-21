import { Component, Input } from '@angular/core';
import { AXWidgetComponent } from '../../widget.component';
import { registerWidget } from '../../widget.service';

@Component({
    templateUrl: './note.widget.html',
    styleUrls: ['./note.widget.scss']
})
export class AXNoteWidgetComponent extends AXWidgetComponent {

    colors: string[] = [
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
        this.onChange.emit(this);
    }

    get options() {
        return {
            color: this.color,
            text: this.text
        }
    }

    onBlur(e) {
        this.onChange.emit(this);
    }

    // onTextChange(e) {
    //     this.text = e.target.value;
    // }

}


registerWidget({
    type: AXNoteWidgetComponent,
    title: "Note-Widget",
    cols:5,
    rows:5,
});