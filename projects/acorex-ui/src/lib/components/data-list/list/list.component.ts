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

  @ContentChild(TemplateRef) templateRef: TemplateRef<any>;

  @Input()
  noStyle: boolean = false;

  @Input() layout: "vertical"| "vertical-wrap"| "horizontal-wrap"| "horizontal-full" = "vertical";

  ngAfterViewInit(): void {
    
    this.fetch();
  }
}
