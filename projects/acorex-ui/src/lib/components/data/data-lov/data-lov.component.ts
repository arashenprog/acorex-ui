import { Component, OnInit, Input } from '@angular/core';
import { AXTextInputBaseComponent } from '../../../core/base.class';
import { AXPopupService } from "../../nav/popup/popup.service"
import { AXDataLovPopupComponent } from './data-lov-popup/data-lov-popup.component';
@Component({
    selector: 'ax-lov',
    templateUrl: './data-lov.component.html',
    styleUrls: ['./data-lov.component.scss']
})
export class AXLOVComponent extends AXTextInputBaseComponent {
    constructor(private popup: AXPopupService) {
        super()
    }
    @Input()
    size: "sm" | "md" | "lg" | "full" = "md"

    @Input()
    dataSource: any[];

    handleButtonClick(e) {
        this.popup.open(AXDataLovPopupComponent, {
            data: {
              dataSource: this.dataSource
            },
            title: this.label,
            size: this.size

          })
          console.log("this.dataSource",this.dataSource)
    }

}
