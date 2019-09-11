import { Component, OnInit, Input, ViewChild, ViewChildren, QueryList, ViewEncapsulation, ChangeDetectionStrategy, Output, EventEmitter, ChangeDetectorRef, ElementRef } from '@angular/core';
import { AXFilterColumnGroup, AXFilterColumnComponent, AXFilterCondition, AXFilterColumn, AXFilterPredefined } from '../filter.class';
import { MenuItem } from '../../../../core/menu.class';
import { AXMenuComponent } from '../../../layout/menu/menu.component';

@Component({
    selector: 'ax-filter-panel',
    templateUrl: './filter-panel.component.html',
    styleUrls: ['./filter-panel.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFilterPanelComponent {

    @ViewChild('footer') footer: ElementRef<HTMLDivElement>;
    @ViewChild('savedList') savedList: ElementRef<HTMLDivElement>;
    @ViewChild('body') body: ElementRef<HTMLDivElement>;
    @ViewChild('menu') menu: AXMenuComponent;

    @ViewChildren(AXFilterColumnComponent) filters: QueryList<AXFilterColumnComponent>;

    @Input()
    groups: AXFilterColumnGroup[] = [];

    @Input()
    predefinedFilters: AXFilterPredefined[] = [];

    allowSave: boolean = false;


    saveItems:MenuItem[]=[
        {
            name:"save",
            text:"Save",
            icon:"fas fa-save"
        },
        {
            name:"saveAs",
            text:"Save as New",
            icon:"fas fa-save"
        },
    ];


    @Output()
    filterChange: EventEmitter<AXFilterCondition[]> = new EventEmitter<AXFilterCondition[]>();

    constructor(private cdr: ChangeDetectorRef) { }

    apply() {
        this.filterChange.emit(this.value);
        this.allowSave = true;
        setTimeout(() => {
            this.menu.update();
        }, 500); 
    }

    public clear() {
        this.filters.forEach(e => {
            e.clear();
        });
        this.predefinedFilters.forEach(c => {
            (<any>c).selected = false;
        });
        this.allowSave = false;
        setTimeout(() => {
            this.menu.update();
        }, 500); 
        this.filterChange.emit(this.value);
    }




    get value(): AXFilterCondition[] {
        let con: AXFilterCondition[] = [];
        if (this.filters) {
            this.filters.forEach(e => {
                if (e.active && e.condition) {
                    con.push(e.condition);
                }
            });
        }
        return con;
    }

    public load(filters: AXFilterCondition[]): void {
        this.filters.forEach(e => {
            e.clear();
        });
        filters.forEach(f => {
            let col = this.filters.find(c => c.field == f.field);
            if (col)
                col.setFilter(f.value, f.condition);
        });
        this.filterChange.emit(this.value);
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            if (this.predefinedFilters) {
                this.setFilterByIndex(0);
            }
            else {
                this.clear();
            }
        }, 100);
        this.applySize();
    }

    setFilterByIndex(index: number) {
        let f = this.predefinedFilters[index];
        if (f) {
            this.setFilterByName(f.name);
        }
    }

    setFilterByName(name: string) {
        let f = this.predefinedFilters.find(c => c.name == name);
        if (f) {
            this.load(f.value);
            this.predefinedFilters.forEach(c => {
                (<any>c).selected = false;
            });
            (<any>f).selected = true;
        }
    }

    saveFilter() {
        let f = this.predefinedFilters.find(c => (<any>c).selected);
        if (f) {
            f.value = this.value;
        }
    }


    private applySize() {
        let h = 0;
        h += this.footer.nativeElement.getBoundingClientRect().height;
        if (this.predefinedFilters && this.predefinedFilters.length)
            h += this.savedList.nativeElement.getBoundingClientRect().height;
        this.body.nativeElement.style.height = `calc(100% - ${h}px)`;
    }
}
