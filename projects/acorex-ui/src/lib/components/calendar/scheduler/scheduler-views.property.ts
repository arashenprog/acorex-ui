import { Component, ContentChildren, QueryList, Input, Attribute } from '@angular/core';

@Component({
    selector: 'ax-scheduler-view',
    template: ``
})
export class AXSchedulerViewProperty {

    constructor(
        @Attribute('type') public type: string,
        @Attribute('caption') public caption: string,
        @Attribute('name') public name: string,
    ) {

    }


    @Input()
    public interval: number;


    ngOnInit(): void {
        if (!this.interval) {
            this.interval = 1;
        }
    }
}



@Component({
    selector: 'ax-scheduler-views',
    template: `
    <ng-content>
    </ng-content>`,
})
export class AXSchedulerViewsProperty {
    @ContentChildren(AXSchedulerViewProperty) views: QueryList<AXSchedulerViewProperty>;
    constructor() { }
}
