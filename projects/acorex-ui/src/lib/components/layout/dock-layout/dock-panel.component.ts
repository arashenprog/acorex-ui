import { Component, OnInit, Input, ContentChildren, QueryList } from '@angular/core';
import { AXDockPanelContentComponent } from './dock-panel-content.component';

@Component({
    selector: 'ax-dock-panel',
    template: `
    <ng-content></ng-content>
`,
})
export class AXDockPanelComponent implements OnInit {
    constructor() { }

    uid: string = "panel-" + Math.floor(Math.random()*100000000);

    @ContentChildren(AXDockPanelComponent)
    private panels: QueryList<AXDockPanelComponent>;

    @ContentChildren(AXDockPanelContentComponent)
    private contents: QueryList<AXDockPanelContentComponent>;

    @Input()
    type: "row" | "column" | "stack" = "column";

    @Input()
    size: number;

    config(): any {
        let conf: any = {}
        conf.type = this.type;
        conf.uid = this.uid;
        conf.content = [];
        console.log(this.size,this.type);
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

    ngOnInit(): void { }
}
