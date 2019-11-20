import { Component, OnInit, Input } from '@angular/core';
import { PromisResult } from '../../../../core/base.class';
import { AXBasePageComponent } from "../../../nav/page.component"
@Component({
    templateUrl: './data-lov-popup.component.html',
})
export class AXDataLovPopupComponent extends AXBasePageComponent {
    constructor() {
        super()
    }

    data: any[]
    onReceiveData(e) {
        this.data = e.dataSource
    }
    provideGridData = (e) => {
        console.log(e);
        return new PromisResult(resolve => {
            resolve(this.data)
        });
    };

    onDoneClick() {

    }
    onCancelClick() {

    }
}
