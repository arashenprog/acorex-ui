import { Component, ContentChild, TemplateRef } from "@angular/core";

@Component({
    selector: "ax-row-template",
    template: `<ng-content></ng-content>
   `
})

export class AXDataGridRowTemplateComponent {
    @ContentChild(TemplateRef) templateRef: TemplateRef<any>;
    renderer: any;
    params: any;
    constructor()
    {
        this.renderer = AXDataGridRowTemplateRenderer;
    }
    ngOnInit(): void {
        this.params = {
            templateRef: this.templateRef
        }
    }
}

@Component({
    template: `
   <ng-container *ngTemplateOutlet="templateRef; context: { $implicit: data }">
   </ng-container>
   `
})

export class AXDataGridRowTemplateRenderer {

    templateRef: TemplateRef<any>;
    data: any;

    agInit(params: any): void {
        this.data = params.node.data;
        this.templateRef = params.templateRef;
    }


}