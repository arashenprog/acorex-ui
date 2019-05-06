import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'ax-theme-wrapper',
    template: '<ng-content></ng-content>',
    host:{'class':'theme-wrapper'},
    styleUrls: ['./theme-wrapper.component.scss'],
    encapsulation:ViewEncapsulation.None
})
export class AXThemeWrapperComponent {
    constructor() { }
}
