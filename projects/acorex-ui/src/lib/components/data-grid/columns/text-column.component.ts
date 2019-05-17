import { AXGridDataColumn } from './column.component';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: "ax-text-column",
    template: "",
    providers: [{ provide: AXGridDataColumn, useExisting: AXGridTextColumn }],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXGridTextColumn extends AXGridDataColumn {

}