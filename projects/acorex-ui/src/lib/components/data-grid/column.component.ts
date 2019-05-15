import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';


export abstract class AXGridDataColumn {

    @Input()
    width: number = 100;

    @Input()
    maxWidth: number;

    @Input()
    minWidth: number;

    @Input()
    pinned: "start" | "end" | null = null;

    @Input()
    sortable: boolean = true;

    @Input()
    sort: "asc" | "desc" | null = null;

    @Input()
    field: string = "";

    @Input()
    caption: string = "";

    constructor() { }

    renderer: any;
}

@Component({
    selector: "ax-text-column",
    template: "",
    providers: [{ provide: AXGridDataColumn, useExisting: AXGridTextColumn }],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXGridTextColumn extends AXGridDataColumn {

}


@Component({
    selector: "ax-check-column",
    template: "",
    providers: [{ provide: AXGridDataColumn, useExisting: AXGridCheckColumn }],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXGridCheckColumn extends AXGridDataColumn {
    constructor() {
        super();
        this.renderer = BooleanRenderer;
    }
}


@Component({
    template: `{{value?"YES":"NO"}}`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BooleanRenderer implements ICellRendererAngularComp {
    value: boolean;

    agInit(params: any): void {
        this.value = params.value;
    }
    refresh(params: any): boolean {
        this.value = params.value;
        return true;
    }
}



