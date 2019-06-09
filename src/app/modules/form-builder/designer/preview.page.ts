import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { AXBasePageComponent } from 'acorex-ui';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    templateUrl: './preview.page.html'
})
export class PreviewFormPage extends AXBasePageComponent {
    constructor(public sanitizer: DomSanitizer) {
        super();
        this.url = sanitizer.bypassSecurityTrustResourceUrl("http://192.168.105.55:6600/JSA/view?ws=demo");
    }

    url: any = null;
    frmHeight: number = 500;
    schema: any = null;
    dataSources: any = null;


    @ViewChild('frame')
    frame: ElementRef;

    @HostListener('window:message', ['$event'])
    handleMessage(e) {
        let action = e.data.action;
        if (action == "Height") {
            this.frmHeight = e.data.height;
        }
        if (action == "LoadForm") {
            this.loadForm();
        }
        if (action == "Scroll") {
            window.scrollTo(0, e.data.y);
        }
        if (action == "Submit") {
            console.log(e.data.data);
           this.close();
        }
    }

 

    onReceiveData(e) {
        this.schema = e.data;
        this.dataSources=e.dataSources;
    }

    private loadForm() {
        this.frame.nativeElement.contentWindow.postMessage({
            action: "LoadForm",
            form: this.schema,
            dataSources: this.dataSources,
            buttons :[ {  style:"success", Name:"ارسال", Action:"Submit" }]
        }, '*');
    }

}
