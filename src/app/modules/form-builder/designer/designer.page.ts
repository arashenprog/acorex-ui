import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { AXBasePageComponent, MenuItem } from 'acorex-ui';
import { DomSanitizer } from '@angular/platform-browser';
import { FormsService } from '../froms.services';

@Component({
    templateUrl: './designer.page.html'
})
export class DesignerPage extends AXBasePageComponent {
    constructor(public sanitizer: DomSanitizer, private formsService: FormsService) {
        super();
        this.url = sanitizer.bypassSecurityTrustResourceUrl("http://192.168.105.55:4201/JSA/designer?ws=demo")
    }

    @ViewChild('frame')
    frame: ElementRef;

    code: string;
    title: string;
    data: any;


    toolbarItems: MenuItem[] = [
        {
            name: "save",
            text: "ذخیره",
            icon: "fas fa-save",
            style: "btn btn-success",
        }
    ]

    onItemMenuRightClick(e) {
        if (e.name == "save") {
            debugger;
            this.formsService.saveForm({
                code: this.code,
                title: this.title,
                data: JSON.stringify(this.data)
            })
        }
    }

    url: any = null;
    frmHeight: number = 500;


    @HostListener('window:message', ['$event'])
    handleMessage(e) {
        let action = e.data.action;
        if (action == "Sync") {
        }
        if (action == "Height") {
            this.frmHeight = e.data.height;
        }
        if (action == "LoadForm") {
            this.frame.nativeElement.contentWindow.postMessage({
                action: "LoadForm",
                form: null,
                dataSources: []
            }, '*');
        }
    }
}
