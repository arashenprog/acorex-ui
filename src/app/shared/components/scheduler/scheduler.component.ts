import { Component, OnInit, ContentChild, Input, ViewEncapsulation, ElementRef } from '@angular/core';
import { AXSchedulerViewsComponent } from './scheduler-views.components';
import { AXToolbarComponent, MenuItem } from 'acorex-ui';
import { AXToolbarSchedulerViewsComponent } from './toolbars/scheduler-toolbar-views';

@Component({
    selector: 'ax-scheduler',
    templateUrl: './scheduler.component.html',
    styleUrls: ['./scheduler.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AXSchedulerComponent implements OnInit {
    constructor(private elm: ElementRef<HTMLDivElement>) { }

    @ContentChild(AXSchedulerViewsComponent) viewManager: AXSchedulerViewsComponent;


    @ContentChild(AXToolbarComponent)
    toolbar: AXToolbarComponent;

    @ContentChild(AXToolbarSchedulerViewsComponent)
    toolbarView: AXToolbarSchedulerViewsComponent;



    ngOnInit(): void { }


    private _currentView: string;
    @Input()
    public get currentView(): string {
        return this._currentView;
    }
    public set currentView(v: string) {
        this.setView(v);
    }

    private viewItems: MenuItem[] = [];


    setView(name: string) {
        this._currentView = name;
        if (this.viewManager.views) {
            this.viewItems.forEach(c => { c.selected = false; })
            this.viewItems.find(c => c.name == name).selected = true;
            this.viewManager.views.forEach(v => {
                v.visible = v.name == name;
            });
        }
    }

    ngAfterViewInit(): void {
        setTimeout(_ => {

            this.viewManager.views.forEach(v => {
                this.viewItems.push({
                    groupName: "view",
                    name: v.name,
                    text: v.title
                })
            });
           
            this.toolbarView.onViewChanged.subscribe(c => {
                debugger;
                this.currentView = c;
            });
            this.toolbarView.items = this.viewItems;
            debugger;
            this.setView(this.currentView);
        });
    }

    ngAfterViewChecked(): void {
        this.updateSize();
    }

    private updateSize() {
        let toolbar = this.elm.nativeElement.querySelector<HTMLElement>(".ax-scheduler-toolbar");
        let container = this.elm.nativeElement.querySelector<HTMLElement>(".view-container");
        if (toolbar) {
            container.style.height = `calc(100% - ${toolbar.clientHeight}px)`;
        }
    }
}
