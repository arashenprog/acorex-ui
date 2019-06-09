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
        private element: ElementRef
    ) {
        super();
        this.url = sanitizer.bypassSecurityTrustResourceUrl("http://192.168.105.55:6600/JSA/designer?ws=demo")
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

    dataSources: any[] = [
        {
            ID:"Staff",
            Type: "1", 
            Title: "لیست  اشخاص",
            Value: [
                { id: "001", title: "علی رضایی" },
                { id: "002", title: "رضا صفری" }
            ]
        },
        {
            ID:"Fidder",
            Type: "1", 
            Title: "لیست فیدر",
            Value: [
                { id: "001", title: "فیدر 1" },
                { id: "002", title: "فیدر 2" },
                { id: "003", title: "فیدر 3" }
            ]
        }
    ];


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
                data: {
                    data: this.data,
                    dataSources: this.dataSources
                },
                size: "sm"
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
                    if (close)
                        setTimeout(() => {
                            this.close();
                        }, 500);
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
            dataSources: this.dataSources
        }, '*');
    }

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
        this.element.nativeElement.querySelector("* .ax-page-content").addEventListener("scroll", this.handleScroll.bind(this));
    }

    ngOnDestroy() {
        this.element.nativeElement.querySelector("* .ax-page-content").removeEventListener("scroll", this.handleScroll.bind(this));
    }

    private handleScroll(e) {
        let scrollY = e.target.scrollTop + 50;
        this.frame.nativeElement.contentWindow.postMessage({
            action: "Scroll",
            y: scrollY
        }, '*');
    }
}
