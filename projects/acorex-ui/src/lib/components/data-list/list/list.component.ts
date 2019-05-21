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
    | "horizontal-full" = "vertical";

  ngAfterViewInit(): void {
    this.fetch();
  }
  setDirection(e) {
    debugger;
    switch (e) {
      case "vertical":
        this.layout = "vertical";
        break;
      case "vertical-wrap":
        this.layout = "vertical-wrap";
        break;
      case "horizontal-wrap":
        this.layout = "horizontal-wrap";
        break;
      case "horizontal-full":
        this.layout = "horizontal-full";
        break;
      default:
        break;
    }
  }
}
