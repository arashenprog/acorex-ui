import {
  Component,
  Input,
  EventEmitter,
  Output,
  ElementRef,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  NgZone,
  ViewChild,
  ChangeDetectorRef,
  ContentChild,
  TemplateRef
} from "@angular/core";
import { AXToolbarItem } from "../toolbar-item";
import { MenuItem } from "../../../../core/menu.class";
import { AXMenuComponent } from "../../menu/menu.component";

@Component({
  selector: "ax-toolbar-menu",
  templateUrl: "./toolbar-menu.component.html",
  styleUrls: ["./toolbar-menu.component.scss"],
  providers: [{ provide: AXToolbarItem, useExisting: AXToolbarMenuComponent }],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXToolbarMenuComponent extends AXToolbarItem {
  constructor(
    private cdr: ChangeDetectorRef
  ) {
    super();
  }

  @ViewChild('menu', /* TODO: add static flag */ {}) menu: AXMenuComponent

  @Output()
  itemClick: EventEmitter<MenuItem> = new EventEmitter<MenuItem>();

  @ContentChild(TemplateRef, /* TODO: add static flag */ {})
  _contentMenuTemplate: TemplateRef<any>;


  private _menuTemplate: TemplateRef<any>;
  @Input()
  public get menuTemplate(): TemplateRef<any> {
    return this._menuTemplate ? this._menuTemplate : this._contentMenuTemplate;
  }
  public set menuTemplate(v: TemplateRef<any>) {
    this._menuTemplate = v;
  }


  @Input()
  public selection: "none" | "single" | "multiple" = "none";

  private _items: MenuItem[];
  @Input()
  public get items(): MenuItem[] {
    return this._items;
  }
  public set items(v: MenuItem[]) {
    this._items = v;
    this.update();
  }


  onItemClick(item?: MenuItem) {
    this.itemClick.emit(item);
  }

  ngAfterViewInit(): void {
    this.cdr.detach();
  }

  ngOnDestroy(): void {

  }

  public close(): void {
    this.menu.close();
  }

  update() {
    this.menu.update();
    this.cdr.markForCheck();
    this.cdr.detectChanges();
  }


}
