import { Component, OnInit, Input, ElementRef, ContentChild, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { SelectorFlags } from '@angular/core/src/render3/interfaces/projection';

@Component({
    selector: 'ax-dock-content',
    template: `<ng-content></ng-content>`,
})
export class AXDockPanelContentComponent implements OnInit {

    @ContentChild(TemplateRef) template: TemplateRef<any>;

    constructor(public viewContainerRef: ViewContainerRef) { }

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
        // if (this.template)
        // {
        //     //conf.template = this.template.elementRef.nativeElement;
        //     console.log((this.template as any)._def.regrences)
        // }
        //conf.componentState = { component: this.elt.nativeElement }
        //console.log(this.caption, (this.templateRef));
        let self = this;
        conf.componentState = {
            text: this.caption,
            render: (el: any) => {
                //console.log(self, el);
                if (self.template) {
                    let view = self.viewContainerRef.createEmbeddedView(self.template)
                    view.rootNodes.forEach(element => {
                        el.append(element);
                    });
                }

            }
        }
        return conf;
    }

    ngOnInit(): void { }

}
