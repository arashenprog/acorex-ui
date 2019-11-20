import { Component, OnInit, Input, ElementRef, ViewChild, HostListener } from '@angular/core';
import { AXButtonBaseComponent } from '../../../core/base.class';

@Component({
    selector: 'ax-button',
    templateUrl: './button.component.html',
})
export class AXButtonComponent extends AXButtonBaseComponent implements OnInit {

    @HostListener('document:keydown.escape', ['$event'])
    onKeydownHandler(e: KeyboardEvent) {
        if (this.cancelBehavior) {
            this.onClickInner();
            e.stopPropagation();
            e.preventDefault();
            return false;
        }
    }

    @ViewChild('container', { static: true }) container: ElementRef;

    constructor() {
        super();
    }

    @Input()
    loading: boolean = false;

    ngOnInit(): void { }

    @Input() text: string;
    @Input() type: "primary" | "secondary" | "danger" | "warning" | "light" | "dark" = "primary"
    @Input() size: "xs" | "sm" | "md" | "lg"  | "xl" = "md"
    @Input() icon: string;
    @Input() block: boolean = false;
    @Input() submitBehavior: boolean = false;
    @Input() cancelBehavior: boolean = false;

    @Input() loadingText: string = "";

    onClickInner() {
        this.onClick.emit();
    }

    ngAfterViewInit() {
        if (this.submitBehavior) {
            setTimeout(() => {
                this.focus();
            }, 50);
        }
    }

    focus() {
        this.container.nativeElement.focus();
    }

}
