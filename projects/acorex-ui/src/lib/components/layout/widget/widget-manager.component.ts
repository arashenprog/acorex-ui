import { Component, OnInit, Input, ElementRef, ViewEncapsulation } from '@angular/core';
import { AXWidgetService, IWidget } from './widget.service';
import { GridsterConfig, GridsterItem, GridType } from 'angular-gridster2';
import { AXWidgetPickerPage } from './widget-picker.page';
import { AXWidgetComponent } from './widget.component';
import { InjectionService } from '../../../core/injection.service';
import { AXPopupService } from '../../nav/api';

@Component({
    selector: 'ax-widget-manager',
    template: `
        <gridster [options]="options" >
            <gridster-item [item]="item" *ngFor="let item of gridItems">
            </gridster-item>
        </gridster>`,
    styleUrls: ['widget-manager.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AXWidgetManagerComponent implements OnInit {

    @Input()
    widgets: IWidget[] = [];
    options: GridsterConfig;
    gridItems: Array<GridsterItem> = [];

    constructor(
        private injection: InjectionService,
        private el: ElementRef,
        private widgetService: AXWidgetService,
        private popupService: AXPopupService) {

    }

    allowEdit(value: boolean) {
        this.options.displayGrid = value ? "always" : "none";
        this.options.draggable.enabled = value;
        this.options.resizable.enabled = value;
        this.options.api.optionsChanged();
        this.widgets.forEach(w => {
            if(w.component)
                w.component.isInEditing = value;
        })
    }

    get isInEditing(): boolean {
        return this.options && this.options.draggable.enabled;
    }


    open() {
        this.popupService.open(AXWidgetPickerPage, "افزودن").closed((e) => {
            if (e.data) {
                this.widgets.push(e.data);
                this.addWidget(e.data, true);
                //this.allowEdit(false);
            }
        });
    }


    addWidget(i: IWidget, editMode: boolean = false) {
        debugger;
        const w = {
            cols: 2,
            rows: 2,
            y: 0,
            x: 0,
            initCallback: (e, r) => {
                debugger;
                const t = this.widgetService.resolve(i.name);
                if (t) {
                    i.component = this.injection.appendComponent(t.type, {}, r.el).instance;
                    i.component.title = t.title;
                    i.component.isInEditing = editMode;
                    i.component.onRemoved.subscribe((c: AXWidgetComponent) => {
                        this.gridItems.splice(this.gridItems.indexOf(w), 1);
                    });
                }
            }
        };
        this.gridItems.push(w);

    }

    ngOnInit(): void {
        debugger;
        this.widgets.forEach(i => {
            this.addWidget(i);
        });
        this.options = {
            displayGrid: "none",
            margin: 5,
            draggable: {
                enabled: false,
                delayStart: 10,
            },
            resizable: {
                enabled: false
            },
            gridType: GridType.Fixed,
            fixedRowHeight: 120,
            fixedColWidth: 120,
            itemChangeCallback: (e) => {
                //localStorage.setItem("zxc",JSON.stringify(this.gridItems));
            }
        };
    }


}
