import { Component, OnInit, ContentChild, Input } from '@angular/core';
import { AXSchedulerViewsComponent } from './scheduler-views.components';
import { AXToolbarComponent } from 'acorex-ui';

@Component({
    selector: 'ax-scheduler',
    templateUrl: './scheduler.component.html',
    styleUrls: ['./scheduler.component.scss']
})
export class AXSchedulerComponent implements OnInit {
    constructor() { }

    @ContentChild(AXSchedulerViewsComponent) viewManager: AXSchedulerViewsComponent;


    @ContentChild(AXToolbarComponent)
    toolbar: AXToolbarComponent;

    ngOnInit(): void { }


    private _currentView: string;
    @Input()
    public get currentView(): string {
        return this._currentView;
    }
    public set currentView(v: string) {
        this._currentView = v;
        this.setView(v);
    }


    setView(name: string) {
        if (this.viewManager.views) {
            this.viewManager.views.forEach(v => {
                v.visible = v.view == name;
            });
        }
    }

    ngAfterViewInit(): void {
        setTimeout(_ => this.setView(this.currentView));
    }
}
