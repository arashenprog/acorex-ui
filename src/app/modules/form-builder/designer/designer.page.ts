import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { AXBasePageComponent, MenuItem, AXToastService, DialogService, AXValidationFormComponent, AXPopupService } from 'acorex-ui';
import { DomSanitizer } from '@angular/platform-browser';
import { FormsService, FormDTO } from '../froms.services';
import { PreviewFormPage } from './preview.page';

@Component({
    templateUrl: './designer.page.html'
})
export class DesignerPage extends AXBasePageComponent {
    constructor(
        public sanitizer: DomSanitizer,
        private formsService: FormsService,
        private toast: AXToastService,
        private popup: AXPopupService,
        private dialog: DialogService,
        private element:ElementRef
        ) {
        super();
        this.url = sanitizer.bypassSecurityTrustResourceUrl("http://192.168.105.55:4201/JSA/designer?ws=demo")
    }

    @ViewChild('frame')
    frame: ElementRef;

    @ViewChild('validator')
    validator: AXValidationFormComponent;


    code: string;
    title: string;
    data: any;

    url: any = null;
    frmHeight: number = 500;


    toolbarItems: MenuItem[] = [
        {
            name: "save",
            text: "ذخیره",
            icon: "fas fa-save",
            style: "btn btn-success",
        },
        {
            name: "save-close",
            text: "ذخیره و بستن",
            icon: "fas fa-save",
            style: "btn btn-warning",
        },
        {
            name: "delete",
            text: "حذف",
            icon: "fas fa-trash-alt",
            style: "btn btn-danger",
        }
    ]

    previewToolbar: MenuItem[] = [
        {
            name: "preview",
            text: "پیش نمایش",
            icon: "fas fa-play fa-flip-horizontal",
            style: "btn btn-success",
        }];

    onItemMenuRightClick(e) {
        if (e.name == "save") {
            this.save(false);
        }
        if (e.name == "save-close") {
            this.save();
        }
        if (e.name == "delete") {
            this.dialog.confirm("حذف", "آیا از حذف این فرم اطمینان دارید؟").okay(() => {
                this.formsService.deleteForm(this.code).then(() => {
                    setTimeout(() => {
                        this.close();
                    }, 100);
                    this.toast.success("با موفقیت انجام شد");
                });
            });
        }
        if (e.name == "preview") {
            this.popup.open(PreviewFormPage, {
                title: "پیش نمایش",
                data: this.data,
                size:"sm"
            })
        }
    }

    private save(close: boolean = true) {
        this.validator.validate().then((result) => {
            if (result.result) {
                this.formsService.saveForm({
                    code: this.code,
                    title: this.title,
                    data: this.data ? JSON.stringify(this.data) : null
                }).then(() => {
                    this.toast.success("با موفقیت انجام شد")
                    setTimeout(() => {
                        if (close)
                            this.close();
                    }, 100);
                });
            }
        });
    }




    @HostListener('window:message', ['$event'])
    handleMessage(e) {
        let action = e.data.action;
        if (action == "Sync") {
            this.data = e.data.form;
        }
        if (action == "Height") {
            this.frmHeight = e.data.height;
        }
        if (action == "LoadForm") {
            this.loadForm();
        }
    }

    private loadForm() {
        this.frame.nativeElement.contentWindow.postMessage({
            action: "LoadForm",
            form: this.data,
            dataSources: []
        }, '*');
    }

    // @HostListener('window:scroll', ['$event'])
    // handleScroll(e) {
    //     console.log(e);
    //     let scrollY = window.parent.pageYOffset;
    //     this.frame.nativeElement.contentWindow.postMessage({
    //         action: "Scroll",
    //         y: scrollY
    //     }, '*');
    // }

    onReceiveData(e) {
        this.formsService.loadForm(e.code).then((f) => {
            if (f) {
                this.code = f.code;
                this.title = f.title;
                this.data = f.data ? JSON.parse(f.data) : null;
                this.loadForm();
            }
        });
    }

    ngAfterViewInit(): void {
        this.element.nativeElement.querySelector("* .ax-page-content").addEventListener("scroll",(e)=>{
            let scrollY = e.target.scrollTop +50;
            console.log(e);
            console.log(scrollY);
            this.frame.nativeElement.contentWindow.postMessage({
                action: "Scroll",
                y: scrollY
            }, '*');
        })
    }
}
