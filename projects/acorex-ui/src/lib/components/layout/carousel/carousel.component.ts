import {
  Component,
  OnInit,
  Input,
  TemplateRef,
  ContentChild
} from "@angular/core";

@Component({
  selector: "ax-carousel",
  templateUrl: "./carousel.component.html",
  styleUrls: ["./carousel.component.scss"]
})
export class AXCarouselComponent implements OnInit {
  constructor() {}

  @ContentChild(TemplateRef, /* TODO: add static flag */ {}) templateRef: TemplateRef<any>;

  private _items: any[];
  @Input()
  public get items(): any[] {
    return this._items;
  }
  public set items(v: any[]) {
    this._items = v;
  }

  seletedIndex: number = 0;
  get selectedItem() {
    return this.items[this.seletedIndex];
  }

  ngOnInit(): void {}

  onNextClick() {
    if (++this.seletedIndex >= this.items.length) {
      this.seletedIndex = 0;
    }
  }

  onPrevClick() {
    if (--this.seletedIndex < 0) {
      this.seletedIndex = this.items.length - 1;
    }
  }
}
