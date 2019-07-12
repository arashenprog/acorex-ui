import { Component, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AXWidgetComponent } from '../../widget.component';
import { IWidget } from '../../widget.service';
import { AXDateTime } from '../../../../../core/calendar/datetime';



@Component({
    templateUrl: "./date.widget.html",
    styleUrls: ["./date.widget.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXDateWidgetComponent extends AXWidgetComponent {


    date: AXDateTime = new AXDateTime();

    private intv;

    constructor(cdr: ChangeDetectorRef) {
        super();
        this.showTitle = false;
        this.intv = setInterval(() => {
            cdr.markForCheck();
        }, 5000);
    }

    ngAfterViewChecked(): void {
        this.date = new AXDateTime();
    }

    ngOnDestroy(): void {
        clearInterval(this.intv);
    }

    get options() {
        return null;
    }

    static define: IWidget = {
        type: AXDateWidgetComponent,
        title: "Date-Widget",
        cols: 5,
        rows: 5,
    }
}
