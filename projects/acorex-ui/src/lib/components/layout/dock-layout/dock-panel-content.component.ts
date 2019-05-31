import { Component, OnInit, Input, ElementRef, ContentChild, TemplateRef, ViewChild } from '@angular/core';

@Component({
    selector: 'ax-dock-content',
    template: `
        <ng-content></ng-content>
    `,
})
export class AXDockPanelContentComponent implements OnInit {

    @ContentChild(TemplateRef) templateRef: TemplateRef<any>;

    constructor() { }

    @Input()
    caption: string;
    @Input()
    closable: boolean;

    uid: string = "content-" + Math.floor(Math.random() * 100000000);


    config(): any {
        let conf: any = {}
        conf.type = "component";
        conf.componentName = "component";
        conf.content = [];
        conf.title = this.caption;

        //conf.componentState = { component: this.elt.nativeElement }
        //console.log(this.caption, (this.templateRef));
        conf.componentState = { text: this.caption, render: this.render }
        return conf;
    }

    ngOnInit(): void { }

    render(el) {
        console.log(this, el);
    }
}
