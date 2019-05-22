import {
  Component,
  ContentChild,
  TemplateRef,
  Input,
  ViewChild,
  ElementRef
} from "@angular/core";
import { AXDataListComponent } from "../core/data-list.component";

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

  @Input()
  noStyle: boolean = false;

  @Input() layout:
    "vertical"
    | "vertical-wrap"
    | "horizontal-wrap"
    | "horizontal" = "vertical";

  ngAfterViewInit(): void {
    this.fetch();
  }
  setDirection(e) {
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

  style: any = {};


}
