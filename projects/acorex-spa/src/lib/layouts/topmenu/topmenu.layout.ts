import {
  Component,
  OnInit,
  Inject,
  ViewEncapsulation,
  ViewChild,
  ElementRef,
  TemplateRef
} from "@angular/core";
import { BaseMenuItem, MenuItem, AXTabPageService } from "acorex-ui";
import { AXHeaderBarMenuService, AXNavMenuService } from "../shared/api";

@Component({
  selector: "top-menu",
  templateUrl: "./topmenu.layout.html",
  styleUrls: ["./topmenu.layout.scss"],
  encapsulation: ViewEncapsulation.None
})
export class AXTopMenuLayoutComponent {
  hasToolbar: boolean = false;
  headerItems: BaseMenuItem[] = [];

  @ViewChild("topMenuWrapper")
  topMenuWrapper: ElementRef<HTMLElement>;

  @ViewChild("header")
  header: ElementRef<HTMLElement>;

  constructor(public headerBarMenuService: AXHeaderBarMenuService) {}

  ngAfterViewInit() {
    this.applySize();
  }

  applySize() {
    this.topMenuWrapper.nativeElement.style.height = `calc(100% - ${
      this.header.nativeElement.clientHeight
    }px)`;
  }

  ngOnInit(): void {
    this.headerBarMenuService.getItems().then(c => {
      this.headerItems = c;
    });
    //
    let logoNode = document.querySelector("#logo") as HTMLElement;
    document.querySelector(".logo-container").innerHTML = logoNode.innerHTML;
  }

  onHeaderClick(e: BaseMenuItem) {
    this.headerBarMenuService.clickItem(e).then(c => {});
  }
}
