import {
  Component,
  ContentChild,
  TemplateRef,
  Input,
  ViewChild,
  ElementRef
} from "@angular/core";
import { AXDataListComponent } from "../core/data-list.component";
import { AXToolbarSearchComponent } from "../../../layout/toolbar/search/toolbar-search.component";
import { AXToolbarComponent } from "../../../layout/toolbar/toolbar.component";
import { AXToolbarListViewComponent, AXListViewDirection } from "./toolbar-list-view.component";

@Component({
  selector: "ax-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"]
})
export class AXListComponent extends AXDataListComponent {
  constructor() {
    super();
  }
  @Input() title: string;

  @ContentChild(TemplateRef) templateRef: TemplateRef<any>;

  @ContentChild(AXToolbarSearchComponent)
  searchToolbar: AXToolbarSearchComponent;

  @ContentChild(AXToolbarListViewComponent)
  viewToolbar: AXToolbarListViewComponent;

  @ContentChild(AXToolbarComponent)
  toolbar: AXToolbarComponent;

  @Input()
  theme:"none"|"default"="default"

  @Input() direction: AXListViewDirection = "vertical";

  ngAfterViewInit(): void {
    this.fetch();
    if (this.viewToolbar) {
      this.viewToolbar.onDirectionChanged.subscribe(c => {
        this.setDirection(c);
      });
    }
  }


 
  setDirection(e: AXListViewDirection) {
    switch (e) {
      case 'vertical': {
        this.style = 'ax-flex-col';
        break
      }
      case 'vertical-wrap': {
        this.style = 'ax-flex-row ax-flex-wrap';
        break;
      }
      case 'horizontal-wrap': {
        this.style = 'ax-flex-row ax-full-width ax-overflow-auto';
        break
      }
      default:
        this.style = 'ax-flex-wrap ';
    }
  }

  @Input()
  style: any = {};


}
