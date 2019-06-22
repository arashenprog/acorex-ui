import { Component, OnInit, ContentChildren, QueryList } from '@angular/core';
import { AXSchedulerViewComponent } from './scheduler-view.component';

@Component({
    selector: 'ax-scheduler-views',
    template: '<ng-content></ng-content>',
})
export class AXSchedulerViewsComponent implements OnInit {
    @ContentChildren(AXSchedulerViewComponent) views: QueryList<AXSchedulerViewComponent>;
    constructor() { }

    ngOnInit(): void { }
}
