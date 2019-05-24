import { Component, OnInit, Input, ElementRef, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { AXWidgetService, IWidget } from './widget.service';
import { GridsterConfig, GridsterItem, GridType } from 'angular-gridster2';
import { AXWidgetPickerPage } from './widget-picker.page';
import { AXWidgetComponent } from './widget.component';
import { InjectionService } from '../../../core/injection.service';
import { AXPopupService } from '../../nav/popup/popup.service';

export interface AXWidgetManagerChangeEvent {
    json: string,
    widgets: IWidget[];
}

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

    @Output()
    onChange: EventEmitter<AXWidgetManagerChangeEvent> = new EventEmitter<AXWidgetManagerChangeEvent>();

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
            if (w.component)
                w.component.isInEditing = value;
        })
    }

    get isInEditing(): boolean {
        return this.options && this.options.draggable.enabled;
    }


    open() {
        this.popupService.open(AXWidgetPickerPage, "Add-Widget").closed((e) => {
            if (e.data) {
                let w = {};
                Object.assign(w, e.data)
                this.widgets.push(w);
                this.addWidget(w, true);
            }
        });
    }


    addWidget(i: IWidget, editMode: boolean = false) {
        i.uid = new Date().getTime();
        const w = {
            cols: i.cols,
            rows: i.rows,
            x: i.x,
            y: i.y,
            uid: i.uid,
            type: i.name,
            initCallback: (e, r) => {
                const t = this.widgetService.resolve(i.name);
                if (t) {
                    i.component = this.injection.appendComponent(t.type, {}, r.el).instance;
                    Object.assign(i.component, i.options);
                    i.component.title = t.title;
                    i.component.isInEditing = editMode;
                    i.component.onRemoved.subscribe((c: AXWidgetComponent) => {
                        //this.gridItems.splice(this.gridItems.indexOf(w), 1);
                        this.gridItems = this.gridItems.filter(f => f.uid != i.uid);
                        this.widgets = this.widgets.filter(f => f.uid != i.uid);
                        this.emitChange();
                    });
                    i.component.onChange.subscribe((c: AXWidgetComponent) => {
                        this.emitChange();
                    });
                    this.emitChange();
                }
            }
        };
        this.gridItems.push(w);
    }

    ngOnInit(): void {

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
            fixedRowHeight: 50,
            fixedColWidth: 50,
            itemChangeCallback: (e) => {
                let w = this.widgets.find(c => c.uid == e.uid);
                w.cols = e.cols;
                w.rows = e.rows;
                w.x = e.x;
                w.y = e.y;
                this.emitChange();
            }
        };
    }

    ngAfterViewInit(): void {
        this.widgets.forEach(i => {
            this.addWidget(i);
        });
    }


    private emitChange(): void {
        let r: AXWidgetManagerChangeEvent = {
            json: JSON.stringify(this.widgets.map(c => {
                return {
                    type: c.type,
                    title: c.title,
                    uid: c.uid,
                    cols: c.cols,
                    rows: c.rows,
                    x: c.x,
                    y: c.y,
                    name: c.name,
                    options: c.component ? c.component.options : null
                }
            })),
            widgets: this.widgets
        }
        this.onChange.emit(r);
    }


}
