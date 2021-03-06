import { Component, OnInit, Input, ViewChild, ViewChildren, QueryList, ViewEncapsulation, ChangeDetectionStrategy, Output, EventEmitter, ChangeDetectorRef, ElementRef, ViewContainerRef } from '@angular/core';
import { AXFilterColumnGroup, AXFilterColumnComponent, AXFilterCondition, AXFilterColumn, AXFilterPredefined } from '../filter.class';
import { MenuItem } from '../../../../core/menu.class';
import { AXMenuComponent } from '../../../layout/menu/menu.component';
import { AXHtmlUtil } from '../../../../core/utils/html/html-util';
import { AXToastService } from '../../../layout/toast/toast.service';
import { AXKeyboardEvent } from '../../../../core/events/keyboard';
import { AXTextBoxComponent } from '../../../../components/form/text-box/text-box.component';

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
    @ViewChild('tbxName') tbxName: AXTextBoxComponent;

    @ViewChildren(AXFilterColumnComponent) filters: QueryList<AXFilterColumnComponent>;

    @Input()
    groups: AXFilterColumnGroup[] = [];

    @Input()
    predefinedFilters: AXFilterPredefined[] = [];

    saveItems: MenuItem[] = [
        {
            name: "saveAs",
            text: "Save",
            icon: "fas fa-save",
            items: [
                {
                    name: "save",
                    text: "Save current",
                },
                {
                    name: "saveAs",
                    text: "Save as New",
                },
            ]
        },

    ];




    @Output()
    filterChange: EventEmitter<AXFilterCondition[]> = new EventEmitter<AXFilterCondition[]>();

    constructor(private cdr: ChangeDetectorRef, private toast: AXToastService) { }

    apply() {
        this.filterChange.emit(this.value);
        this.updateMenu();
    }

    public clear() {
        this.filters.forEach(e => {
            e.clear();
        });
        this.predefinedFilters.forEach(c => {
            (<any>c).selected = false;
        });
        this.filterChange.emit(this.value);
        this.updateMenu();
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
        this.cancelSaveFilter();
        filters.forEach(f => {
            let col = this.filters.find(c => c.field == f.field);
            if (col)
                col.setFilter(f.value, f.condition);
        });
        this.filterChange.emit(this.value);
        //
        this.updateMenu();
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

   

    removeFilter(f: AXFilterPredefined) {
        this.predefinedFilters = this.predefinedFilters.filter(c => c.name != f.name);
        this.updateMenu();
    }

    private get currentFilter(): AXFilterPredefined {
        return this.predefinedFilters.find(c => (<any>c).selected);
    }


    private applySize() {
        let h = 0;
        h += this.footer.nativeElement.getBoundingClientRect().height;
        if (this.predefinedFilters && this.predefinedFilters.length)
            h += this.savedList.nativeElement.getBoundingClientRect().height;
        this.body.nativeElement.style.height = `calc(100% - ${h}px)`;
    }

    // SAVE FILTERS

    private updateMenu(): void {
        setTimeout(() => {
            this.saveItems[0].items[0].visible = this.currentFilter != null;
            this.saveItems[0].items[1].visible = this.currentFilter != null;
            this.menu.update();
        }, 100);
    }

    applySaveFilter() {
        let f = this.currentFilter;
        if (f) {
            this.tbxName.validate().then(c => {
                if (c.result) {
                    f.value = this.value;
                    (<any>f).isInEdit = false;
                    (<any>f).isNew = false;
                    f.title = this.tbxName.text;
                    this.toast.success("Filter saved successfully.");
                    this.updateMenu();
                }
            });
        }
    }

    cancelSaveFilter() {
        let f = this.currentFilter;
        if (f) {
            if ((<any>f).isNew) {
                this.removeFilter(f);
            }
            else {
                (<any>f).isInEdit = false;
            }
        }
        this.updateMenu();
    }

    onMenuItemClick(e: MenuItem) {
        if (e.name == "save") {
            this.applySaveFilter();
        }
        if (e.name == "saveAs") {
            let f = {
                name: AXHtmlUtil.getUID(),
                title: '',
                value: this.value
            };
            this.predefinedFilters.push(f);
            (<any>f).isNew = true;
            this.setFilterByName(f.name);
            this.handleRenameClick(f)
        }
    }

    tbxNameOnKey(e: AXKeyboardEvent) {
        if (e.type == "keyup" && e.key == 'Enter') {
            this.applySaveFilter();
        }
        if (e.type == "keyup" && e.key == 'Escape') {
            this.cancelSaveFilter();
        }
    }

    handleRenameClick(f: AXFilterPredefined) {
        (<any>f).isInEdit = true;
        this.cdr.detectChanges();
        setTimeout(() => {
            this.tbxName.text = f.title;
            this.tbxName.focus()
        }, 50);
    }
}
