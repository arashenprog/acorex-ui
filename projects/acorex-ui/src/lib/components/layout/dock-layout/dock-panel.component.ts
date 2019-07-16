import { Component, OnInit, Input, ContentChildren, QueryList, Attribute, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AXDockPanelContentComponent } from './dock-panel-content.component';

@Component({
    selector: 'ax-dock-panel',
    template: `<ng-content></ng-content>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXDockPanelComponent {
    constructor(private cdr: ChangeDetectorRef
    ) {

    }

    private uid: string = "panel-" + Math.floor(Math.random() * 100000000);

    @Input("type") public type: "row" | "column" | "stack" = "column";
    @Input("size") public size: number;

    @ContentChildren(AXDockPanelComponent)
    private panels: QueryList<AXDockPanelComponent>;

    @ContentChildren(AXDockPanelContentComponent)
    private contents: QueryList<AXDockPanelContentComponent>;

    config(): any {
        let conf: any = {}
        conf.type = this.type;
        conf.uid = this.uid;
        conf.content = [];
        if (this.type == "column" && this.size)
            conf.height = this.size;
        if ((this.type == "row" || this.type == "stack") && this.size)
            conf.width = this.size;

        this.panels.filter(c => c.uid != this.uid).forEach(p => {
            conf.content.push(p.config())
        });
        this.contents.forEach(c => {
            conf.content.push(c.config())
        });
        return conf;
    }

    ngAfterViewInit(): void {
        this.cdr.detach();
    }

}
